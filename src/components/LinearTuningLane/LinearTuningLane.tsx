import { TunerData } from '../Tuner/Tuner';
import { animated, useSpring } from '@react-spring/web';
import NoteIndicator from '../NoteIndicator/NoteIndicator';

const LinearTuningLane = ({
	data,
	color,
}: {
	data: TunerData | undefined;
	color: string;
}) => {
	const tunerIndicatorProps = useSpring({
		to: {
			left: data ? `${data.cents + 50}%` : '50%',
			opacity: data ? 1 : 0,
		},
		from: { left: '0%' },
	});

	const noteIndicatorProps = useSpring({
		to: {
			opacity: data ? 1 : 0,
		},
	});

	return (
		<div
			id='tuner-container'
			className='h-1/2 w-full mx-auto flex flex-col justify-center gap-10'
		>
			<div
				id='freq-indicator'
				className='text-center text-stone-500 text-2xl mb-4'
			>
				{data ? <p>{data.frequency.toFixed(2)} hz</p> : <p>- hz</p>}
			</div>
			<div
				id='lane-container'
				className='flex flex-row justify-between items-center relative'
			>
				<animated.span
					id='cents-indicator'
					style={tunerIndicatorProps}
					className='inline-block absolute mb-16 -translate-x-1/2 text-center text-stone-500'
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
