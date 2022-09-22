import { animated, useSpring } from '@react-spring/web';
import { useRef } from 'react';

const LoudnessMeter = ({ loudness }: { loudness: number | undefined }) => {
	const prev = useRef(0);
	loudness = loudness ?? -90;
	const w = (263 / 90) * loudness + 263;
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
					<use clipPath='url(#shell-clip)' href='#shell' fill='green' />
				</svg>
			</div>
			<div className='flex flex-row justify-between text-neutral-500'>
				<span>-90dB</span>
				<span>0dB</span>
			</div>
		</div>
	);
};

export default LoudnessMeter;
