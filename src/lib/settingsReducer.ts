import { TunerSettings } from './classes/TunerSettings';

export interface SettingsAction {
	type:
		| 'changeReference'
		| 'toggleEnharmonic'
		| 'changeTransposition'
		| 'changeNoteSystem';
	payload?: unknown;
}

const settingsReducer = (
	state: TunerSettings,
	action: SettingsAction
): TunerSettings => {
	const { type, payload } = action;
	switch (type) {
		case 'changeReference':
			return { ...state, A: payload as number };
		case 'toggleEnharmonic':
			return { ...state, showEnharmonic: !state.showEnharmonic };
		case 'changeTransposition':
			return { ...state, transposition: payload as number };
		case 'changeNoteSystem':
			return { ...state, noteNameSystem: payload as number };
		default:
			return state;
	}
};

export default settingsReducer;
