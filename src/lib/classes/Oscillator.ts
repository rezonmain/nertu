import TET, { NoteName } from './TET';

class Oscillator {
	audioContext: AudioContext;
	oscillator: OscillatorNode;
	gainNode: GainNode;
	tet: TET;

	constructor(startingFrequency?: number) {
		this.audioContext = new AudioContext();
		this.oscillator = this.audioContext.createOscillator();
		this.oscillator.frequency.value = startingFrequency ?? 440;
		this.gainNode = this.audioContext.createGain();
		this.gainNode.gain.value = Oscillator.initialAmplitude;
		this.oscillator.connect(this.gainNode);
		this.gainNode.connect(this.audioContext.destination);
		this.tet = new TET();
	}

	setParams({
		amplitude,
		noteName,
		octave,
		cents,
		shape,
	}: {
		amplitude: number;
		noteName: NoteName;
		octave: number;
		cents: number;
		shape: OscillatorType;
	}) {
		this.gainNode.gain.value = amplitude;
		this.oscillator.frequency.value = this.tet.toFrequency({
			noteName,
			octave,
			cents,
			ref: this.tet.A,
		});
		this.oscillator.type = shape;
	}

	set shape(type: OscillatorType) {
		this.oscillator.type = type;
	}

	get shape() {
		return this.oscillator.type;
	}

	set amplitude(a: number) {
		this.gainNode.gain.value = a;
	}

	get amplitude() {
		return this.gainNode.gain.value;
	}

	set frequency(f: number) {
		this.oscillator.frequency.value = f;
	}

	get frequency() {
		return this.oscillator.frequency.value;
	}

	start() {
		this.oscillator.start();
	}

	stop() {
		this.oscillator.stop();
	}

	static initialAmplitude = 0.2;
}

export default Oscillator;
