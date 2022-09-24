import { TunerData } from '../Tuner/Tuner';
import { animated, useSpring } from '@react-spring/web';
import NoteIndicator from '../NoteIndicator/NoteIndicator';
import { useSettings } from '../../lib/context/settingsContext';
import { Transpositions, TunerSettings } from '../../lib/classes/TunerSettings';

const LinearTuningLane = ({
	data,
	color,
}: {
	data: TunerData | undefined;
	color: string;
}) => {
	const { settings } = useSettings();
	const tunerIndicatorProps = useSpring({
		to: {
			left: data ? `${data.cents + 50}%` : '50%',
			opacity: data ? 1 : 0,
		},
		from: { left: '0%' },
	});

	return (
		<div
			id='tuner-container'
			className='mx-auto w-full max-w-md flex flex-col justify-center font-mono'
		>
			<div
				id='freq-indicator'
				className='text-center text-stone-500 text-2xl mb-10'
			>
				{data ? <p>{data.frequency.toFixed(2)} hz</p> : <p>- hz</p>}
			</div>
			<div
				id='alt-settings-indicators'
				className='flex flex-row justify-between font-music text-stone-500'
			>
				{settings.A !== TunerSettings.DEF.A ? (
					<span>
						A<sub>4</sub> = {settings.A}
					</span>
				) : (
					<span></span>
				)}
				{settings.transposition !== TunerSettings.DEF.transposition ? (
					<span>{Transpositions[settings.transposition]}</span>
				) : (
					<span></span>
				)}
			</div>
			<div
				id='lane-container'
				className='flex flex-row justify-between items-center relative mb-10'
			>
				<animated.span
					id='cents-indicator'
					style={tunerIndicatorProps}
					className='inline-block absolute mt-16 -translate-x-1/2 text-center text-stone-400'
				>
					{data && (data.cents > 0 ? `+${data.cents}c` : `${data.cents}c`)}
				</animated.span>

				<div className='border border-stone-300 w-full h-0'></div>
				<div className='outline outline-stone-300 h-7 aspect-square rounded-full'></div>
				<div className='border border-stone-300 w-full h-0'></div>

				<animated.span
					id='tuning-indicator'
					style={{
						...tunerIndicatorProps,
						backgroundColor: color,
					}}
					className='z-10 absolute inline-block aspect-square h-7 rounded-full -translate-x-1/2 transition-colors'
				></animated.span>
			</div>
			<NoteIndicator note={data?.noteName} octave={data?.octave} />
		</div>
	);
};
export default LinearTuningLane;
