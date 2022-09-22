import Layout from './components/Layout/Layout';
import ToneGenerator from './components/ToneGenerator/ToneGenerator';
import Tuner from './components/Tuner/Tuner';

function App() {
	return (
		<Layout>
			<>
				<ToneGenerator />
				<Tuner />
			</>
		</Layout>
	);
}

export default App;
