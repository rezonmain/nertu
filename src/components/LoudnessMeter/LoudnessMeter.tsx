import { animated, useSpring } from '@react-spring/web';
import { useRef } from 'react';
import constrain from '../../lib/constrain';

const LoudnessMeter = ({
	loudness,
	color,
	range = { min: -60, max: 0 },
}: {
	loudness: number | undefined;
	color: string;
	range?: { min: number; max: number };
}) => {
	const prev = useRef(0);

	loudness = loudness ?? range.min;

	let w = (263 / Math.abs(range.max - range.min)) * loudness + 263;
	w = constrain(0, 263, w);

	const wProp = useSpring({ to: { width: w }, from: { width: prev.current } });

	prev.current = w;

	return (
		<div className='flex flex-col gap-4 mx-auto'>
			<div>
				<svg
					viewBox='0 0 263 32'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					stroke='#d6d3d1'
				>
					<polygon points='0,32 263,0 263,32' id='shell' />
					<clipPath id='shell-clip'>
						<animated.rect x='0' y='0' {...wProp} height='32' />
					</clipPath>
					<use
						clipPath='url(#shell-clip)'
						href='#shell'
						fill={color}
						className='transition-colors'
					/>
				</svg>
			</div>
			<div className='flex flex-row justify-between text-neutral-500'>
				<span>{range.min}dB</span>
				<span>{range.max}dB</span>
			</div>
		</div>
	);
};

export default LoudnessMeter;
