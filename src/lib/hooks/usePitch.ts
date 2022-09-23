import { PitchDetector } from 'pitchy';
import { useEffect, useState } from 'react';

/**
 *
 * @param existingAudioContext optional, provide an existing AudioContext otherwise a new instance of it is created
 * @returns
 */
const usePitch = (existingAudioContext?: AudioContext) => {
	const [state, setState] = useState<{
		media?: boolean;
		audioContext?: AudioContext;
		analyser?: AnalyserNode;
		detector?: PitchDetector<Float32Array>;
		error?: string;
	}>({
		media: false,
		audioContext: undefined,
		analyser: undefined,
		detector: undefined,
		error: '',
	});

	const getPitchMock = () => {
		return {
			frequency: 440,
			clarity: 1,
		};
	};

	/**
	 * Get the frequency and clarity of the current audio stream
	 * @param minClarity the minimum amount of clarity `(0 - 1)` for the function to return a value, defaults to `0.85`
	 * @returns
	 */
	const getPitch = (minClarity: number = 0.85) => {
		let pitch = [0, 0];
		let loudness = 0;
		if (state.audioContext && state.detector && state.analyser) {
			const input = new Float32Array(state.detector.inputLength);
			state.analyser.getFloatTimeDomainData(input);
			const res = state.detector.findPitch(
				input,
				state.audioContext.sampleRate
			);
			let sum = input.reduce((prev, curr) => prev + curr * curr);
			sum = sum < 0 ? 0.00001 : sum;
			const rms = Math.sqrt(sum / input.length);
			loudness = 20 * (Math.log(rms) / Math.log(10));
			pitch = res[1] >= minClarity ? res : pitch;
		}
		return {
			frequency: pitch[0],
			clarity: pitch[1],
			loudness,
		};
	};

	const getMedia = () => {
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				const audioContext = existingAudioContext ?? new AudioContext();
				const analyser = audioContext.createAnalyser();
				const detector = PitchDetector.forFloat32Array(analyser.fftSize);
				audioContext.createMediaStreamSource(stream).connect(analyser);
				setState({
					media: true,
					audioContext,
					analyser,
					detector,
				});
			})
			.catch((error) => {
				alert(error);
				setState({
					media: false,
					error,
				});
			});
	};

	useEffect(() => {
		navigator.mediaDevices.addEventListener('devicechange', getMedia);
		return () =>
			navigator.mediaDevices.removeEventListener('devicechange', getMedia);
	}, []);

	return { getPitch, getPitchMock, getMedia, ...state };
};

export const DEFUALT_PITCH: Pitch = {
	frequency: 0,
	clarity: 0,
	loudness: 0,
};

export interface Pitch {
	frequency: number;
	clarity: number;
	loudness: number;
}

export default usePitch;
