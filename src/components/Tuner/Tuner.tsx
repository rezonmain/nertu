import { useInterval } from 'react-use';
import { useState } from 'react';
import TET, { Note } from '../../lib/classes/TET';
import usePitch, { Pitch, DEFUALT_PITCH } from '../../lib/hooks/usePitch';
import LinearTuner from '../LinearTuningLane/LinearTuningLane';
import ToneGenerator from '../ToneGenerator/ToneGenerator';
import LoudnessMeter from '../LoudnessMeter/LoudnessMeter';

export interface TunerData extends Note, Pitch {}

function Tuner() {
	const { getPitch, getMedia, media } = usePitch();
	const [store, setStore] = useState<TunerData | undefined>({
		...TET.DEFAULT_NOTE,
		...DEFUALT_PITCH,
	});

	const tet = new TET();

	useInterval(() => {
		const pitch = getPitch(0.9);
		const note = tet.frequencyToNote(pitch.frequency);
		note ? setStore({ ...note, ...pitch }) : setStore(undefined);
	}, 150);

	if (!media) {
		return <button onClick={() => getMedia()}>Click to use microphone</button>;
	}

	return (
		<>
			<LinearTuner data={store} />
			<LoudnessMeter loudness={store?.loudness} />
		</>
	);
}

export default Tuner;
