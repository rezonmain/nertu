interface OscillatorParams {
	amplitude: number;
	frequency: number;
	shape: OscillatorType;
}

class Oscillator {
	audioContext: AudioContext;
	oscillator: OscillatorNode | null;
	gainNode: GainNode;
	params: OscillatorParams;

	constructor(audioContext = new AudioContext()) {
		this.audioContext = audioContext;
		this.oscillator = null;
		this.gainNode = this.audioContext.createGain();
		this.gainNode.connect(this.audioContext.destination);
		this.params = Oscillator.DEF_PARAMS;
	}

	setParams(params?: {
		amplitude?: number;
		frequency?: number;
		shape?: OscillatorType;
	}) {
		this.params = {
			...this.params,
			...params,
		};
	}

	set shape(type: OscillatorType) {
		this.params.shape = type;
		if (this.oscillator) {
			this.oscillator.type = type;
		}
	}

	get shape() {
		return this.params.shape;
	}

	set amplitude(a: number) {
		this.params.amplitude = a;
		this.gainNode.gain.value = a;
	}

	get amplitude() {
		return this.params.amplitude;
	}

	set frequency(f: number) {
		this.params.frequency = f;
		if (this.oscillator) {
			this.oscillator.frequency.value = f;
		}
	}

	get frequency() {
		return this.params.frequency;
	}

	start(when?: number) {
		this.oscillator = this.audioContext.createOscillator();
		this.oscillator.connect(this.gainNode);
		this.gainNode.gain.value = this.params.amplitude;
		this.oscillator.type = this.params.shape;
		this.oscillator.frequency.value = this.params.frequency;
		this.oscillator.start(when);
	}

	stop(when?: number) {
		this.oscillator!.stop(when);
	}

	static DEF_PARAMS: OscillatorParams = {
		amplitude: 0.2,
		frequency: 440,
		shape: 'sine',
	};
}

export default Oscillator;
