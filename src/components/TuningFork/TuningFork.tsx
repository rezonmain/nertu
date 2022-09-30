import React, { ChangeEvent, useEffect, useRef } from 'react';
import { useState } from 'react';
import { FiRadio } from 'react-icons/fi';
import Oscillator from '../../lib/classes/Oscillator';
import TET, { Note, NoteMap } from '../../lib/classes/TET';
import { useSettings } from '../../lib/context/settingsContext';

const TuningFork = () => {
	const { settings } = useSettings();
	const oscillator = useRef<Oscillator>();
	const [playing, setplaying] = useState(false);
	const [note, setNote] = useState<Note>({
		noteName: 'A',
		octave: 4,
		cents: 0,
		ref: settings.A,
	});

	// Update state params on form select
	const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setNote((prev) => ({
			...prev,
			[name]: name === 'octave' ? parseInt(value) : value,
		}));
	};

	// Toggle state and oscillator playing state
	const onPlay = () => {
		setplaying((prev) => !prev);
		playing ? oscillator.current?.stop() : oscillator.current?.start();
	};

	// Update oscillator params on re-render
	useEffect(() => {
		const frequency = new TET(settings.A).toFrequency({ ...note });
		oscillator.current?.setParams({ frequency, amplitude: 0.75 });
	});

	// Create oscillator object on mount
	useEffect(() => {
		oscillator.current = new Oscillator();
	}, []);

	return (
		<article id='tuning-fork' className='flex flex-col gap-3 select-none'>
			<div
				onClick={onPlay}
				id='fork-toggle'
				className={`border-2 rounded-md cursor-pointer p-2 transition-colors ${
					playing
						? 'border-fuchsia-600 text-stone-300'
						: 'text-stone-500 border-stone-500'
				}`}
			>
				<FiRadio size={24} className='mx-auto' />
			</div>
			<div id='fork-controls' className='flex flex-row gap-3'>
				<label id='pitch-controls' className='flex flex-col'>
					<small>Pitch: </small>
					<select
						className='bg-inherit text-lg outline-none border-b-2 border-transparent transition-colors focus:border-b-fuchsia-600'
						name='noteName'
						defaultValue={note.noteName}
						onChange={onSelect}
					>
						{Array.from({ length: 12 }).map((v, i) => {
							const noteName = NoteMap[i + settings.noteNameSystem * 12];
							return (
								<option key={i} value={noteName}>
									{noteName}
								</option>
							);
						})}
					</select>
				</label>
				<label id='octave-controls' className='flex flex-col'>
					<small>Octave: </small>
					<select
						className='bg-inherit text-lg outline-none border-b-2 border-transparent transition-colors focus:border-b-fuchsia-600'
						name='octave'
						defaultValue={note.octave}
						onChange={onSelect}
					>
						{Array.from({ length: 9 }).map((v, i) => {
							return (
								<option key={i} value={i}>
									{i}
								</option>
							);
						})}
					</select>
				</label>
			</div>
		</article>
	);
};

export default React.memo(TuningFork);
