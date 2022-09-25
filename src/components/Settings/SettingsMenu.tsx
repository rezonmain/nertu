import { NoteMap } from '../../lib/classes/TET';
import { useSettings } from '../../lib/context/settingsContext';
import List from '../List/List';
import ListEntry from '../List/ListEntry';

const SettingMenu = () => {
	const { settings } = useSettings();
	return (
		<List>
			<ListEntry
				title='A4 pitch reference'
				description='Frequency for A4'
			></ListEntry>
			<ListEntry
				title='Show enharmonic'
				description='Display enharmonic note names while tuning'
			></ListEntry>
			<ListEntry
				title='Transposition'
				description={`Instrument C sound like concert ${
					NoteMap[settings.transposition]
				}`}
			></ListEntry>
			<ListEntry
				title='Note names'
				description='Select which system to use for note names'
			></ListEntry>
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
