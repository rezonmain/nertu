import { useInterval } from 'react-use';
import { useState } from 'react';
import TET, { Note } from '../../lib/classes/TET';
import usePitch, { Pitch } from '../../lib/hooks/usePitch';
import LoudnessMeter from '../LoudnessMeter/LoudnessMeter';
import PermissionModal from '../PermissionModal/PermissionModal';
import LinearTuningLane from '../LinearTuningLane/LinearTuningLane';

export interface TunerData extends Note, Pitch {}

function Tuner() {
	const { getPitch, getMedia, media } = usePitch();
	const [store, setStore] = useState<TunerData | undefined>(undefined);

	const tet = new TET();

	useInterval(() => {
		if (!media) return;
		const pitch = getPitch(0.9);
		const note = tet.frequencyToNote(pitch.frequency);
		note ? setStore({ ...note, ...pitch }) : setStore(undefined);
	}, 100);

	const onAsk = () => {
		getMedia();
	};

	const color = `hsl(${
		store ? -Math.abs(store!.cents * 3) + 142 : 142
	}, 69%, 58%)`;

	return (
		<>
			{!media && <PermissionModal onAsk={onAsk} />}
			<LinearTuningLane data={store} color={color} />
			<LoudnessMeter loudness={store?.loudness} color={color} />
		</>
	);
}

export default Tuner;
