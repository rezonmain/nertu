import { animated, useSpring } from '@react-spring/web';

const Toggle = ({
	onToggle,
	value,
}: {
	onToggle: () => void;
	value: boolean;
}) => {
	const laneActive = '#d946ef';
	const laneInactive = '#44403c';
	const indicatorActive = '#a21caf';
	const indicatorInactive = '#f5f5f4';

	const indicatorProps = useSpring({
		to: value
			? { left: '40%', backgroundColor: indicatorActive }
			: { left: '-10%', backgroundColor: indicatorInactive },
		config: {
			tension: 450,
		},
	});

	const laneProps = useSpring({
		to: value
			? { backgroundColor: laneActive }
			: { backgroundColor: laneInactive },
	});

	return (
		<div
			id='toggle-switch'
			role='switch'
			aria-checked={value}
			onClick={(e) => {
				e.stopPropagation();
				onToggle();
			}}
			className='w-8 h-5 relative'
		>
			<animated.div
				id='toggle-lane'
				style={laneProps}
				className='w-8 h-4 rounded-lg cursor-pointer relative top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'
			></animated.div>
			<animated.div
				id='toggle-indicator'
				style={indicatorProps}
				className='absolute top-0 w-5 aspect-square rounded-full bg-emerald-700 drop-shadow-md'
			></animated.div>
		</div>
	);
};

export default Toggle;
