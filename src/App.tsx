import { useReducer } from 'react';
import Layout from './components/Layout/Layout';
import MetronomeComponent from './components/Metronome/Metronome';
import Tuner from './components/Tuner/Tuner';
import { SettingsContext, useSettings } from './lib/context/settingsContext';
import settingsReducer from './lib/settingsReducer';

function App() {
	const { settings } = useSettings();
	const [init, dispatch] = useReducer(settingsReducer, settings);
	return (
		<Layout>
			<SettingsContext.Provider value={{ settings: init, dispatch }}>
				<Tuner />
			</SettingsContext.Provider>
		</Layout>
	);
}

export default App;
