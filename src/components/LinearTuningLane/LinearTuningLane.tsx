import { TunerData } from '../Tuner/Tuner';
import { animated, useSpring } from '@react-spring/web';

const LinearTuner = ({ data }: { data: TunerData | undefined }) => {
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
			className='h-full w-3/4 mx-auto flex flex-col justify-center gap-14'
		>
			<div id='freq-indicator' className='text-center text-stone-500 text-xl'>
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
					{data ? data.cents : '0'}c
				</animated.span>
				<div className='border border-stone-300 w-full h-0'></div>
				<div className='outline outline-stone-300 h-7 aspect-square rounded-full'></div>
				<div className='border border-stone-300 w-full h-0'></div>
				<animated.span
					id='tuning-indicator'
					style={{
						...tunerIndicatorProps,
						backgroundColor: `hsl(${
							data ? -Math.abs(data!.cents * 3) + 142 : 142
						}, 69%, 58%)`,
					}}
					className='z-10 absolute inline-block aspect-square h-7 rounded-full -translate-x-1/2 transition-colors'
				></animated.span>
			</div>
			<animated.div
				id='note-indicator'
				style={noteIndicatorProps}
				className='self-center'
			>
				{data ? (
					<p className='text-5xl block'>
						{data.noteName}
						<sub className='text-xl'>{data.octave}</sub>
					</p>
				) : (
					<div className='h-12'></div>
				)}
			</animated.div>
		</div>
	);
};
export default LinearTuner;
