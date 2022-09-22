import ran from '../../lib/utils/ran';

const WidgetCarousel = () => {
	return (
		<div>
			<MockWidget />
			<MockWidget />
			<MockWidget />
		</div>
	);
};

export default WidgetCarousel;

const MockWidget = () => {
	return (
		<div
			style={{ backgroundColor: `hsl(${ran(0, 180)}, 58%, 69%)` }}
			className='h-60'
		></div>
	);
};
