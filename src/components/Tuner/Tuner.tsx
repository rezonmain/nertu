import { useInterval } from 'react-use';
import { useState } from 'react';
import TET, { Note } from '../../lib/classes/TET';
import usePitch, { Pitch, DEFUALT_PITCH } from '../../lib/hooks/usePitch';
import LinearTuner from '../LinearTuningLane/LinearTuningLane';
import ToneGenerator from '../ToneGenerator/ToneGenerator';
import LoudnessMeter from '../LoudnessMeter/LoudnessMeter';
import CurvedTuningLane from '../CurvedTuningLane/CurvedTuningLane';

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
	}, 100);

	const color = `hsl(${
		store ? -Math.abs(store!.cents * 3) + 142 : 142
	}, 69%, 58%)`;

	return (
		<>
			{media ? (
				<LinearTuner data={store} color={color} />
			) : (
				<button onClick={() => getMedia()}>Click to use microphone</button>
			)}

			<LoudnessMeter loudness={store?.loudness} color={color} />
		</>
	);
}

export default Tuner;
