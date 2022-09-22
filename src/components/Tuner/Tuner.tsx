import { useInterval } from 'react-use';
import { useState } from 'react';
import TET, { Note } from '../../lib/classes/TET';
import usePitch, { Pitch, DEFUALT_PITCH } from '../../lib/hooks/usePitch';
import CurvedTuningLane from '../CurvedTuningLane/CurvedTuningLane';
import Layout from '../Layout/Layout';
import LinearTuner from '../LinearTuningLane/LinearTuningLane';

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
		<Layout>
			<LinearTuner data={store} />
		</Layout>
	);
}

export default Tuner;
