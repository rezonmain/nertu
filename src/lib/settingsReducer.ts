import { TunerSettings } from './classes/TunerSettings';

export interface SettingsAction {
	type:
		| 'changeReference'
		| 'toggleEnharmonic'
		| 'changeTransposition'
		| 'changeNoteSystem';
	payload?: unknown;
}

const saveSettings = (state: TunerSettings) => {
	localStorage.setItem('settings', JSON.stringify(state));
};

const settingsReducer = (
	state: TunerSettings,
	action: SettingsAction
): TunerSettings => {
	const { type, payload } = action;
	let newState: TunerSettings;
	switch (type) {
		case 'changeReference':
			newState = { ...state, A: payload as number };
			break;
		case 'toggleEnharmonic':
			newState = { ...state, showEnharmonic: !state.showEnharmonic };
			break;
		case 'changeTransposition':
			newState = { ...state, transposition: payload as number };
			break;
		case 'changeNoteSystem':
			newState = { ...state, noteNameSystem: payload as number };
			break;
		default:
			newState = state;
			break;
	}
	saveSettings(newState);
	return newState;
};

export default settingsReducer;
