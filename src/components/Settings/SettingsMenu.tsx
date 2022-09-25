import List from '../List/List';
import ListEntry from '../List/ListEntry';

const SettingMenu = () => {
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
