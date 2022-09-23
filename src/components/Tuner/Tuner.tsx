import { useInterval } from 'react-use';
import { useState } from 'react';
import TET, { Note } from '../../lib/classes/TET';
import usePitch, { Pitch } from '../../lib/hooks/usePitch';
import LoudnessMeter from '../LoudnessMeter/LoudnessMeter';
import PermissionModal from '../PermissionModal/PermissionModal';
import LinearTuningLane from '../LinearTuningLane/LinearTuningLane';
import Header from '../Header/Header';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import { AnimatePresence } from 'framer-motion';

export interface TunerData extends Note, Pitch {}

function Tuner() {
	const { getPitch, getMedia, media } = usePitch();
	const [store, setStore] = useState<TunerData | undefined>(undefined);
	const [settings, setSettings] = useState(false);

	const color = `hsl(${
		store ? -Math.abs(store!.cents * 3) + 142 : 142
	}, 58%, 69%)`;

	const tet = new TET();

	useInterval(
		() => {
			if (!media) return;
			const pitch = getPitch(0.9);
			const note = tet.frequencyToNote(pitch.frequency);
			note ? setStore({ ...note, ...pitch }) : setStore(undefined);
		},
		settings ? null : 100
	);

	return (
		<>
			<Header onSettings={() => setSettings((prev) => !prev)} />
			<div
				id='content'
				className='px-10 my-auto h-screen flex flex-col justify-center'
			>
				<PermissionModal visible={!media} onAsk={() => getMedia()} />
				<SettingsMenu
					visible={settings}
					onSettings={() => setSettings((prev) => !prev)}
				/>
				<LinearTuningLane data={store} color={color} />
				<LoudnessMeter loudness={store?.loudness} color={color} />
			</div>
		</>
	);
}

export default Tuner;
