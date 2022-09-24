import { createContext, Dispatch, useContext } from 'react';
import { TunerSettings } from '../classes/TunerSettings';
import { SettingsAction } from '../settingsReducer';

export type SettingsContext = {
	settings: TunerSettings;
	dispatch: Dispatch<SettingsAction>;
};

export const SettingsContext = createContext<SettingsContext>({
	settings: new TunerSettings(),
	dispatch: () => {},
});

export const useSettings = () => useContext(SettingsContext);
