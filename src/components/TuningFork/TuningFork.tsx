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

	const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setNote((prev) => ({
			...prev,
			[name]: name === 'octave' ? parseInt(value) : value,
			ref: settings.A,
		}));
	};

	const onPlay = () => {
		setplaying((prev) => !prev);
		playing ? oscillator.current?.stop() : oscillator.current?.start();
	};

	useEffect(() => {
		const frequency = new TET().toFrequency({ ...note, ref: settings.A });
		oscillator.current?.setParams({ frequency });
	});

	useEffect(() => {
		oscillator.current = new Oscillator();
	}, []);

	return (
		<article id='tuning-fork' className='flex flex-col gap-3 select-none'>
			<div
				onClick={onPlay}
				id='playing-toggle'
				className={`text-stone-300 border-stone-500 border-2 rounded-md cursor-pointer p-2 transition-colors ${
					playing ? 'border-fuchsia-600' : ''
				}`}
			>
				<FiRadio size={24} className='mx-auto' />
			</div>
			<div id='controls' className='flex flex-row gap-3'>
				<label className='flex flex-col'>
					<small>pitch</small>
					<select
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
				<label className='flex flex-col'>
					<small>oct</small>
					<select name='octave' defaultValue={note.octave} onChange={onSelect}>
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
