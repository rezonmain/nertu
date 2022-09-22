import TET from '../../lib/classes/TET';
import { TunerData } from '../Tuner/Tuner';
import { animated, useSpring } from '@react-spring/web';

const LinearTuner = ({ data }: { data: TunerData | undefined }) => {
	const tet = new TET();
	const tunerIndicatorProps = useSpring({
		to: {
			left: data ? `${data.cents + 50}%` : '50%',
			opacity: data ? 1 : 0,
		},
		from: { left: '0%' },
	});
	const noteIndicatorProps = useSpring({
		to: { opacity: data ? 1 : 0 },
	});
	const enharmonic = data && tet.getEnharmonic(data.noteName);

	return (
		<div className='w-3/4 mx-auto flex flex-col justify-center gap-4'>
			<div className='h-1'>{data && <p>{data.frequency.toFixed(2)} hz</p>}</div>
			<div className='flex flex-row justify-between items-center relative'>
				<div className='border w-full h-0'></div>
				<div className='outline h-5 aspect-square rounded-full'></div>
				<div className='border w-full h-0'></div>
				<animated.span
					style={tunerIndicatorProps}
					className='z-10 absolute inline-block w-5 h-5 rounded-full -translate-x-1/2 bg-green-400'
				></animated.span>
			</div>
			<animated.div style={noteIndicatorProps} className='self-center'>
				{data && <span className='text-3xl'>{data.noteName}</span>}
				{data && <span>{data.octave}</span>}
				{enharmonic && <p>{enharmonic}</p>}
			</animated.div>
		</div>
	);
};
export default LinearTuner;
