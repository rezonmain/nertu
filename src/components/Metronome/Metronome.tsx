import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Metronome from '../../lib/classes/Metronome';
import { BsChevronCompactUp, BsChevronCompactDown } from 'react-icons/bs';
import React from 'react';
import { useSettings } from '../../lib/context/settingsContext';
import constrain from '../../lib/utils/constrain';

const MetronomeComponent = () => {
	const [pingPong, setPingPong] = useState(false);
	const metronome = useRef<Metronome | undefined>();
	const { settings, dispatch } = useSettings();
	const [play, setPlay] = useState(false);
	const [local, setLocal] = useState(settings.metronome.bpm);

	const startStop = () => {
		play ? metronome.current?.stop() : metronome.current?.start();
		setPlay((prev) => !prev);
	};

	const onBPM = (e: ChangeEvent<HTMLInputElement>) => {
		// Input validation
		const bpm = e.target.valueAsNumber
			? constrain(Metronome.MIN, Metronome.MAX, e.target.valueAsNumber)
			: Metronome.MIN;
		metronome.current?.setTempo(bpm);
		dispatch({ type: 'changeBPM', payload: bpm });
		setLocal(bpm);
	};

	useEffect(() => {
		metronome.current = new Metronome(settings.metronome.bpm);
		metronome.current.onBeat(() => setPingPong((prev) => !prev));
		return () => {
			metronome.current?.worker.terminate();
		};
	}, []);

	return (
		<div id='metronome' className='flex flex-col gap-3 w-fit h-fit'>
			<div
				onClick={startStop}
				id='metronome-toggle'
				className={`h-fit w-fit py-2 flex flex-row items-center justify-center rounded-md gap-3 px-3 border-2 cursor-pointer transition-colors ${
					!play ? 'border-stone-500' : 'border-fuchsia-600'
				}`}
			>
				<span
					id='ping'
					className={`w-[24px] inline-block aspect-square rounded-full border-stone-500 ${
						pingPong ? 'bg-stone-300' : 'border'
					}`}
				></span>
				<span
					id='pong'
					className={`w-[24px] inline-block aspect-square rounded-full border-stone-500 ${
						!pingPong ? 'bg-stone-300' : 'border'
					}`}
				></span>
			</div>
			<div
				id='metronome-controls'
				className='flex flex-row justify-between items-center gap-3'
			>
				<span
					id='tap-tempo'
					className='block select-none cursor-pointer p-2 rounded-md border-2 border-stone-500 active:border-fuchsia-600 transition-colors'
				>
					Tap
				</span>
				<div id='tempo-input' className='flex flex-col items-center'>
					<form onSubmit={(e) => e.preventDefault()}>
						<label>
							<input
								onBlur={onBPM}
								onChange={(e) => setLocal(e.target.valueAsNumber)}
								value={local}
								type='number'
								style={{
									width: `${local.toString().length}ch`,
								}}
								className='appearance-none bg-inherit text-lg outline-none border-b-2 border-transparent transition-colors focus:border-b-fuchsia-600'
							/>
							<small> bpm</small>
						</label>
					</form>
				</div>
			</div>
		</div>
	);
};

export default React.memo(MetronomeComponent);
