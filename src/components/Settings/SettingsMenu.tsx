import { NoteMap } from '../../lib/classes/TET';
import { NoteSystems, Transpositions } from '../../lib/classes/TunerSettings';
import { useSettings } from '../../lib/context/settingsContext';
import List from '../List/List';
import ListEntry from '../List/ListEntry';

const SettingMenu = () => {
	const { settings } = useSettings();
	return (
		<List>
			<ListEntry
				title='Pitch reference'
				description={
					<span>
						Frequency for A<sub>4</sub>
					</span>
				}
			>
				<span className='text-stone-400'>{settings.A}hz</span>
			</ListEntry>
			<ListEntry
				title='Show enharmonic'
				description='Display enharmonic note names while tuning'
			></ListEntry>
			<ListEntry
				title='Transposition'
				description={
					<span>
						Instrument <span className='font-music'>C </span>sounds like concert{' '}
						<span className='font-music'>
							{NoteMap[settings.transposition]}
						</span>
					</span>
				}
			>
				<span className='text-stone-400 font-music'>
					{Transpositions[settings.transposition]}
				</span>
			</ListEntry>
			<ListEntry
				title='Note names'
				description='Select which system to use for note names'
			>
				<span className='text-stone-400'>
					{NoteSystems[settings.noteNameSystem]}
				</span>
			</ListEntry>
			<ListEntry title='FAQ'></ListEntry>
			<ListEntry title='About'></ListEntry>
		</List>
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
