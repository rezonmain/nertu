import { useEffect, useRef, useState } from 'react';
import Metronome from '../../lib/classes/Metronome';

const MetronomeComponent = () => {
	const [beatCounter, setBeatCounter] = useState(0);
	const metronome = useRef<Metronome | undefined>();
	const [play, setPlay] = useState(false);

	const startStop = () => {
		play ? metronome.current?.stop() : metronome.current?.start();
		setPlay((prev) => !prev);
	};

	useEffect(() => {
		metronome.current = new Metronome();
		metronome.current.onBeat(() => setBeatCounter((prev) => prev + 1));
		return () => {
			delete metronome.current;
		};
	}, []);

	return (
		<div className='flex flex-col gap-10'>
			<button onClick={() => startStop()}>{play ? 'Stop' : 'Start'}</button>
			<button onClick={() => metronome.current?.setTempo(400)}>Tempo</button>
			<p className='text-center'>{beatCounter}</p>
		</div>
	);
};

export default MetronomeComponent;
