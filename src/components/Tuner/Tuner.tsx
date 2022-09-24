import { useInterval } from 'react-use';
import { useReducer, useState } from 'react';
import TET, { Note } from '../../lib/classes/TET';
import usePitch, { Pitch } from '../../lib/hooks/usePitch';
import LoudnessMeter from '../LoudnessMeter/LoudnessMeter';
import PermissionModal from '../PermissionModal/PermissionModal';
import LinearTuningLane from '../LinearTuningLane/LinearTuningLane';
import Header from '../Header/Header';
import Settings from '../Settings/Settings';
import ToneGenerator from '../ToneGenerator/ToneGenerator';
import { TunerSettings } from '../../lib/classes/TunerSettings';
import { useSettings } from '../../lib/context/settingsContext';

export interface TunerData extends Note, Pitch {}

function Tuner() {
	const { settings } = useSettings();
	const { getPitch, getMedia, media } = usePitch();
	const [store, setStore] = useState<TunerData | undefined>(undefined);
	const [settingsToggle, setSettingsToggle] = useState(false);

	const color = `hsl(${
		store ? -Math.abs(store!.cents * 3) + 142 : 142
	}, 58%, 69%)`;

	const tet = new TET(settings.A);

	useInterval(
		() => {
			if (!media) return;
			const pitch = getPitch(0.9);
			const note = tet.frequencyToNote(pitch.frequency, settings.transposition);
			note ? setStore({ ...note, ...pitch }) : setStore(undefined);
		},
		settingsToggle ? null : 100
	);

	return (
		<>
			<PermissionModal visible={!media} onAsk={() => getMedia()} />
			<Header onSettings={() => setSettingsToggle((prev) => !prev)} />
			<div className='px-10 my-auto h-screen flex flex-col justify-center'>
				<Settings
					visible={settingsToggle}
					onSettings={() => setSettingsToggle((prev) => !prev)}
				/>
				<ToneGenerator />
				<LinearTuningLane data={store} color={color} />
				<LoudnessMeter loudness={store?.loudness} color={color} />
			</div>
		</>
	);
}

export default Tuner;
