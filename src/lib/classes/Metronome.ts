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
	audioContext;
	oscillator: Oscillator;
	timing: TimingParams;
	beatQueue: number[];
	worker;
	isPlaying: boolean;
	onBeatCallback = () => {};

	constructor(
		tempo = 120,
		audioContext = new AudioContext(),
		params?: TimingParams
	) {
		this.tempo = tempo;
		this.audioContext = audioContext;
		this.timing = {
			...Metronome.DEF_PARAMS,
			...params,
		};
		this.oscillator = new Oscillator();
		this.oscillator.setParams({ amplitude: 0.75 });
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
			if (!this.isPlaying) return;
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

	start() {
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
		console.log(this.audioContext.currentTime);
	}

	static DEF_PARAMS: TimingParams = {
		// In seconds:
		lookAhead: 0.05,
		scheduleAhead: 0.2,
		nextBeatTime: 0,
		beatDuration: 0.05,
	};
}

export default Metronome;
