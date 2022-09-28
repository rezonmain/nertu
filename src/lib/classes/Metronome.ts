/*
 * Implementation of a robust metronome based on the article and implementation by
 * Chris Wilson, see: https://web.dev/audio-scheduling/ & https://github.com/cwilso/metronome/
 * https://vitejs.dev/guide/features.html#import-with-constructors
 */

import Oscillator from './Oscillator';

interface TimingParams {
	lookAhead: number;
	scheduleAhead: number;
	nextBeatTime: number;
	beatDuration: number;
}

class Metronome {
	tempo;
	audioContext: AudioContext | undefined;
	oscillator: Oscillator | undefined;
	timing: TimingParams;
	beatQueue: number[];
	worker;
	isPlaying: boolean;
	onBeatCallback = () => {};

	constructor(audioContext?: AudioContext, tempo = 120, params?: TimingParams) {
		this.tempo = tempo;
		this.audioContext = audioContext;
		this.timing = {
			...Metronome.DEF_PARAMS,
			...params,
		};
		this.oscillator = undefined;
		this.beatQueue = [];
		this.isPlaying = false;
		// See: https://vitejs.dev/guide/features.html#import-with-constructors
		this.worker = new Worker(
			new URL('./../metronomeWorker.ts', import.meta.url)
		);
		this.eventSetup();
	}

	private eventSetup() {
		this.worker.postMessage({
			interval: this.timing.lookAhead * 1000,
		});

		this.worker.onmessage = (e) => e.data === 'beat' && this.scheduleBeat();
	}

	private scheduleBeat() {
		if (!this.audioContext || !this.oscillator) return;
		while (
			this.timing.nextBeatTime <
			this.audioContext.currentTime + this.timing.scheduleAhead
		) {
			this.beatQueue.push(this.timing.nextBeatTime);
			this.oscillator.start(this.timing.nextBeatTime);
			this.oscillator.stop(this.timing.nextBeatTime + this.timing.beatDuration);
			const delta = 60.0 / this.tempo;
			this.timing.nextBeatTime += delta;
		}
	}

	private testOnBeat() {
		/*
		 * Set up variables for frameLoop closure;
		 * So the requestCallback has reference to them
		 * this is to avoid binding the this object
		 * to the requestCallback, and avoid making
		 * a new function reference every frame.
		 * See: https://stackoverflow.com/a/48817802
		 */
		const queue = this.beatQueue;
		const callback = this.onBeatCallback;

		const frameLoop = () => {
			if (!this.isPlaying || !this.audioContext) return;
			const time = this.audioContext.currentTime;
			while (queue.length && queue[0] < time) {
				queue.shift();
				callback();
			}
			window.requestAnimationFrame(frameLoop);
		};
		this.beatQueue = queue;
		window.requestAnimationFrame(frameLoop);
	}

	/**
	 * Provide a callback function to run on every beat, useful for
	 * updating visual elements on the beat.
	 * @param callback callback function to run on every beat
	 */
	onBeat(callback: () => void) {
		this.onBeatCallback = callback;
	}

	/**
	 * Start playing sound, this function must be on a call stack
	 * triggered by user interaction. See: https://goo.gl/7K7WLu
	 */
	start() {
		// Audio context must be created or resumed on user interaction
		this.audioContext = this.audioContext ?? new AudioContext();
		this.oscillator = this.oscillator ?? new Oscillator(this.audioContext);
		this.oscillator.setParams({ amplitude: 0.75 });
		this.timing.nextBeatTime = this.audioContext.currentTime;
		this.isPlaying = true;
		this.worker.postMessage('start');
		this.testOnBeat();
	}

	stop() {
		this.isPlaying = false;
		this.worker.postMessage('stop');
	}

	/**
	 * Set tempo of the quarter note, can be set while playing.
	 * @param tempo bpm
	 */
	setTempo(tempo: number) {
		this.tempo = tempo;
	}

	/**
	 * Calcualte tap tempo, meant to be called on user interaction.
	 */
	getTapTempo() {
		console.log('tap');
	}

	static DEF_PARAMS: TimingParams = {
		// In seconds:
		lookAhead: 0.025,
		scheduleAhead: 0.1,
		nextBeatTime: 0,
		beatDuration: 0.05,
	};
}

export default Metronome;
