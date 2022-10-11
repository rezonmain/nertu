interface OscillatorParams {
  amplitude: number;
  frequency: number;
  shape: OscillatorType;
}

class Oscillator {
  private audioContext: AudioContext | undefined;
  private oscillator: OscillatorNode | undefined;
  private gainNode: GainNode | undefined;
  private params: OscillatorParams;

  constructor(audioContext?: AudioContext) {
    this.audioContext = audioContext;
    this.oscillator = undefined;
    this.gainNode = undefined;
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
    if (this.oscillator) {
      this.oscillator.frequency.value = this.params.frequency;
      this.oscillator.type = this.params.shape;
    }
    if (this.gainNode) this.gainNode.gain.value = this.params.amplitude;
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
    if (this.gainNode) this.gainNode.gain.value = a;
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
    this.audioContext = this.audioContext ?? new AudioContext();
    this.audioContext.resume();
    this.oscillator = this.audioContext.createOscillator();
    this.gainNode = this.gainNode ?? this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
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
    shape: "sine",
  };
}

export default Oscillator;
