import { animated, useSpring } from '@react-spring/web';
import NoteIndicator from '../NoteIndicator/NoteIndicator';
import { TunerData } from '../Tuner/Tuner';
const CurvedTuningLane = ({
	data,
	color,
}: {
	data: TunerData | undefined;
	color: string;
}) => {
	/*
	 offset = 15.5 when cents = -50
	 offset = -15.5 when cents = 50
	 m = y2 - y1 / x2 - x2 so:
	 (-15.5 - 15.5) / (50 - -50) = -0.31,
   b = 1.4 (to center indicator)

   For x position:
	 increments = 326.5 (viewBox x) / 101 (-50 to 50),
	 adjustedCents = cents + 50 (so 0 is leftmost), so:
	 x = increments * adjustedCents + offset

	 For y position: closest parabola eq
	*/
	let x = 163;
	let y = 16;

	const props = useSpring({
		to: { opacity: data ? 1 : 0 },
		from: { opacity: 0 },
	});

	if (data) {
		const offset = data && data.cents * -0.31 + 1.4;
		x = data && (326.5 / 101) * (data.cents + 50) + offset;
		y = 0.00318426 * x ** 2 - 1.03828 * x + 100.638;
	}

	return (
		<div className='w-full h-fit mx-auto max-w-md flex flex-col'>
			<div
				id='freq-indicator'
				className='text-center text-stone-500 text-xl mb-10'
			>
				{data ? <p>{data.frequency.toFixed(2)} hz</p> : <p>- hz</p>}
			</div>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				version='1.1'
				viewBox='0 0 326.5 100'
			>
				<g transform='translate(-.501)'>
					<circle cx='163' cy='16' r='15.5' stroke='#d6d3d1'></circle>
					<path
						stroke='#d6d3d1'
						d='M312 85c-32.431-38.566-79.9-64.31-133.5-68.422M15 85c32.229-38.326 79.31-63.99 132.5-68.342'
					></path>
					<path
						stroke='#d6d3d1'
						strokeOpacity='0'
						d='M163.355 16c5.097 0 10.148.195 15.145.579C232.1 20.688 279.569 46.433 312 85M163.645 16c-5.437 0-10.822.222-16.145.658C94.31 21.01 47.229 46.674 15 85'
					></path>
					<animated.circle
						cx={`${x}`}
						cy={`${y}`}
						style={props}
						r='14.5'
						fill={color}
					></animated.circle>
				</g>
			</svg>
			<NoteIndicator note={data?.noteName} octave={data?.octave} as='curved' />
			<animated.span
				id='cents-indicator'
				className='inline-block absolute mb-16 -translate-x-1/2 text-center text-stone-500'
			></animated.span>
		</div>
	);
};

export default CurvedTuningLane;
