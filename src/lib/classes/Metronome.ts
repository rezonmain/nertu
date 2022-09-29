/*
 * Implementation of a robust metronome based on the article and code by
 * Chris Wilson, see: https://web.dev/audio-scheduling/ & https://github.com/cwilso/metronome/
 *
 * Tap tempo implementation is of my own.
 */

import constrain from '../utils/constrain';
import Oscillator from './Oscillator';

interface TimingParams {
	lookAhead: number;
	scheduleAhead: number;
	nextBeatTime: number;
	beatDuration: number;
}

class Metronome {
	private internTempo;
	private audioContext: AudioContext | undefined;
	private oscillator: Oscillator | undefined;
	private timing: TimingParams;
	private beatQueue: number[];
	private tapTempo: {
		queue: number[];
		timeout: number;
	};
	private onBeatCallback = () => {};
	worker;
	isPlaying: boolean;

	constructor(tempo = 120, audioContext?: AudioContext, params?: TimingParams) {
		this.internTempo = tempo;
		this.audioContext = audioContext;
		this.timing = {
			...Metronome.DEF_PARAMS,
			...params,
		};
		this.oscillator = undefined;
		this.beatQueue = [];
		this.tapTempo = { queue: [], timeout: 0 };
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
			const delta = 60.0 / this.internTempo;
			this.timing.nextBeatTime += delta;
		}
	}

	private testOnBeat() {
		/*
		 * Set up variables for frameLoop closure;
		 * So the requestCallback has reference to them,
		 * this is to avoid binding the `this` object
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

	get tempo() {
		return this.internTempo;
	}

	set tempo(tempo: number) {
		this.internTempo = tempo;
	}

	/**
	 * Provide a callback function to run on every beat, useful for
	 * updating visual elements on the beat.
	 * @param callback callback function to run on every beat.
	 */
	onBeat(callback: () => void) {
		this.onBeatCallback = callback;
	}

	/**
	 * Start playing sound, this function must be on a call stack
	 * triggered by user interaction. See: https://goo.gl/7K7WLu
	 */
	start() {
		this.audioContext = this.audioContext ?? new AudioContext();
		this.audioContext.resume();
		this.oscillator = this.oscillator ?? new Oscillator(this.audioContext);
		this.oscillator.setParams({ amplitude: 0.75 });
		this.timing.nextBeatTime = this.audioContext.currentTime;
		this.isPlaying = true;
		this.worker.postMessage('start');
		this.testOnBeat();
	}

	stop() {
		this.audioContext?.suspend();
		this.isPlaying = false;
		this.worker.postMessage('stop');
	}

	/**
	 * Calcualte tap tempo, meant to be called on user interaction.
	 * It calculates tempo by getting the average difference of time
	 * between function calls, it resets after 1.5 seconds of no call.
	 * If there are no sufficient timings to get the tempo, it returns undefined.
	 */
	getTapTempo() {
		// Push the current time to the queue
		this.tapTempo.queue.push(Date.now());

		// Reset the queue clear timer on input
		clearTimeout(this.tapTempo.timeout);

		// Clear the time queue if no input was detected in 1.5 seconds after last input
		this.tapTempo.timeout = setTimeout(() => {
			this.tapTempo.queue = [];
			console.log('cleared');
		}, 1500);

		// Calculate the tempo from the input time deltas
		if (this.tapTempo.queue.length > 1) {
			const q = this.tapTempo.queue;
			const averageDelta =
				q
					// Get the difference between times
					.map((v, i) => q[i + 1] - v)
					// Remove the NaN as difference will be queue.len - 1
					.filter((v) => v)
					// Sum the differences
					.reduce((c, p) => c + p) /
				// Divide by length of differences to get average
				(q.length - 1);
			return constrain(
				Metronome.MIN,
				Metronome.MAX,
				// Calculate bpm, 60000ms = 1min, average delta is in ms so:
				Math.round(60000 / averageDelta)
			);
		}
	}

	static DEF_PARAMS: TimingParams = {
		// In seconds:
		lookAhead: 0.025,
		scheduleAhead: 0.1,
		nextBeatTime: 0,
		beatDuration: 0.05,
	};

	static MIN = 50;
	static MAX = 360;
}

export default Metronome;
