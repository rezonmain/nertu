import Layout from './components/Layout/Layout';
import TuningLane from './components/TuningLane/TuningLane';
import usePitch, { DEFUALT_PITCH, Pitch } from './lib/hooks/usePitch';
import { useInterval } from 'react-use';
import TET, { Note } from './lib/classes/TET';
import { useState } from 'react';

export interface TunerData extends Note, Pitch {}

function App() {
	const { getPitch, getMedia, media } = usePitch();
	const [store, setStore] = useState<TunerData>({
		...TET.DEFAULT_NOTE,
		...DEFUALT_PITCH,
	});

	const tet = new TET();

	useInterval(() => {
		const pitch = getPitch();
		const note = tet.frequencyToNote(pitch.frequency);
		note && setStore({ ...note, ...pitch });
	}, 100);

	if (!media) {
		return <button onClick={() => getMedia()}>Click to use microphone</button>;
	}

	return (
		<Layout>
			<TuningLane data={store} />
		</Layout>
	);
}

export default App;
