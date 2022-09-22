import { ChangeEvent, useState } from 'react';
import Oscillator from '../../lib/classes/Oscillator';
import TET, { NoteName } from '../../lib/classes/TET';

const ToneGenerator = () => {
	const tet = new TET();
	const [oscillator, setOscillator] = useState<Oscillator | null>(null);
	const [formData, setFormData] = useState({
		amplitude: Oscillator.initialAmplitude,
		noteName: 'A' as NoteName,
		octave: 4,
		cents: 0,
		shape: 'sine' as OscillatorType,
	});

	const handlePlayClick = () => {
		if (!oscillator) {
			const osc = new Oscillator();
			osc.amplitude = formData.amplitude;
			osc.frequency = tet.toFrequency({
				noteName: formData.noteName as NoteName,
				octave: formData.octave,
				cents: formData.cents,
			});
			osc.shape = formData.shape as OscillatorType;
			osc.start();
			setOscillator(osc);
		} else {
			oscillator.stop();
			setOscillator(null);
		}
	};

	const formChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	oscillator?.setParams(formData);

	return (
		<div id='controls' className='flex flex-col gap-2 items-start outline'>
			<h1>Tone Generator</h1>
			<label id='amplitude-label' htmlFor='amplitude'>
				Amplitude: {formData.amplitude}
			</label>
			<input
				className='block text-black'
				onChange={formChange}
				type='range'
				min='0.0'
				max='1.0'
				step='0.01'
				value={formData.amplitude}
				name='amplitude'
			/>
			<p>{`Frequency: ${tet.toFrequency({
				noteName: formData.noteName as NoteName,
				octave: formData.octave,
				cents: formData.cents,
			})} hz`}</p>
			<label>
				Note:{' '}
				<select onChange={formChange} value={formData.noteName} name='noteName'>
					{tet.noteNameIter((note, index) => (
						<option key={index} value={note}>
							{note}
						</option>
					))}
				</select>
			</label>
			<label>
				Octave:{' '}
				<input
					type='number'
					min='0'
					max='8'
					value={formData.octave}
					onChange={formChange}
					name='octave'
				/>
			</label>
			<label>
				Cents:{' '}
				<input
					type='number'
					min='-100'
					max='100'
					value={formData.cents}
					onChange={formChange}
					name='cents'
				/>
			</label>

			<button
				className='py-1 px-2 bg-neutral-800 text-white rounded-lg outline-blue-600 hover:outline'
				onClick={handlePlayClick}
			>
				{oscillator ? 'Stop' : 'Play'}
			</button>
		</div>
	);
};

export default ToneGenerator;
