import { ChangeEvent, useState } from 'react';
import TET, { NoteMap } from '../../lib/classes/TET';
import { NoteSystems, Transpositions } from '../../lib/classes/TunerSettings';
import { useSettings } from '../../lib/context/settingsContext';
import ControlModal from '../ControlModal/ControlModal';
import List from '../List/List';
import ListEntry from '../List/ListEntry';
import Toggle from '../Toggle/Toggle';

const SettingMenu = () => {
	const { settings, dispatch } = useSettings();
	const [controlModal, setControlModal] = useState<{
		show: boolean;
		title: string | null;
		control: JSX.Element | null;
	}>({
		show: false,
		title: null,
		control: null,
	});

	const onMenuItem = (title: string, control: JSX.Element) => {
		setControlModal({ show: true, title, control });
	};

	const onDone = () => {
		setControlModal({ show: false, title: null, control: null });
	};
	return (
		<>
			<List>
				<ListEntry
					title='Pitch reference'
					description={
						<span>
							Frequency for A<sub>4</sub>
						</span>
					}
					onClick={() =>
						onMenuItem(
							'Pitch Reference',
							<PitchReferenceControl onDone={onDone} />
						)
					}
				>
					<span className='text-stone-400'>{settings.A}hz</span>
				</ListEntry>
				<ListEntry
					onClick={() => dispatch({ type: 'toggleEnharmonic' })}
					title='Show enharmonic'
					description='Display enharmonic note names while tuning'
				>
					<Toggle
						onToggle={() => dispatch({ type: 'toggleEnharmonic' })}
						value={settings.showEnharmonic}
					/>
				</ListEntry>
				<ListEntry
					title='Transposition'
					description={
						<span>
							Instrument <span className='font-music'>C </span>sounds like
							concert{' '}
							<span className='font-music'>
								{NoteMap[settings.transposition]}
							</span>
						</span>
					}
					onClick={() =>
						onMenuItem(
							'Transposition',
							<TranspositionControl onDone={onDone} />
						)
					}
				>
					<span className='text-stone-400 font-music'>
						{Transpositions[settings.transposition]}
					</span>
				</ListEntry>
				<ListEntry
					title='Note names'
					description='Select which system to use for note names'
					onClick={() =>
						onMenuItem(
							'Note name system',
							<NameSystemControl onDone={onDone} />
						)
					}
				>
					<span className='text-stone-400'>
						{NoteSystems[settings.noteNameSystem]}
					</span>
				</ListEntry>
				<ListEntry title='FAQ'></ListEntry>
				<ListEntry title='About'></ListEntry>
			</List>
			<ControlModal
				key='control-modal'
				visible={controlModal.show}
				title={controlModal.title}
				onCancel={onDone}
			>
				{controlModal.control}
			</ControlModal>
		</>
	);
};

const PitchReferenceControl = ({ onDone }: { onDone: () => void }) => {
	return <div>Pitch reference</div>;
};

const TranspositionControl = ({ onDone }: { onDone: () => void }) => {
	const { settings, dispatch } = useSettings();
	const tet = new TET();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = e.target;
		checked &&
			dispatch({ type: 'changeTransposition', payload: parseInt(value) });
		onDone();
	};
	return (
		<form className='flex flex-col flex-wrap max-h-[350px] gap-6'>
			{tet.noteNameIter((note, index) => (
				<label key={index} className='text-lg font-music flex flex-row gap-3'>
					<input
						type='radio'
						name='transposition'
						value={index}
						className='w-5'
						checked={index === settings.transposition}
						onChange={handleChange}
					/>
					{Transpositions[index]}
				</label>
			))}
		</form>
	);
};

const NameSystemControl = ({ onDone }: { onDone: () => void }) => {
	const { settings, dispatch } = useSettings();
	const systems = Object.keys(NoteSystems).filter(
		(value) => !parseInt(value) && value !== '0'
	);
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = e.target;
		checked && dispatch({ type: 'changeNoteSystem', payload: parseInt(value) });
		onDone();
	};

	return (
		<form className='flex flex-col justify-center flex-wrap max-h-[300px] gap-6'>
			{systems.map((val, index) => (
				<label key={index} className='text-lg font-music flex flex-row gap-3'>
					<input
						type='radio'
						name='systems'
						value={index}
						className='w-5'
						checked={index === settings.noteNameSystem}
						onChange={handleChange}
					/>
					{NoteSystems[index]}
				</label>
			))}
		</form>
	);
};

/**
 * ---setting--- --- defualt--- ---desc--- ---values example---
 * - A4 pitch reference:, 440h, frequency for A4, [432, 445...]
 * - show enharmonic notes:, (true), show enharmonic note names while tuning, false
 * - transposition:, c->c (none), (c->Bb, C->Eb), C in your instrument sounds like concert Eb
 * - note names:, C-B, select which system to use for note names, Do-Si
 * - faq
 * - about
 *  **/
export default SettingMenu;
