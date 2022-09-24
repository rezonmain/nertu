import { createContext, Dispatch, useContext } from 'react';
import { TunerSettings } from '../classes/TunerSettings';
import { SettingsAction } from '../settingsReducer';

export type SettingsContext = {
	settings: TunerSettings;
	dispatch: Dispatch<SettingsAction>;
};

// look for saved settings and used them if found
export const SettingsContext = createContext<SettingsContext>({
	settings: (() => {
		console.log(localStorage);
		const saved = localStorage.getItem('settings');
		return saved ? (JSON.parse(saved) as TunerSettings) : new TunerSettings();
	})(),
	dispatch: () => {},
});
export const useSettings = () => useContext(SettingsContext);
