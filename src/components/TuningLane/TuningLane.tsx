const TuningLane = () => {
	//ar = 3.6170
	return (
		<div className='w-full h-fit mx-auto'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='mx-auto w-[90%]'
				// width='297.765'
				// height='85.322'
				fill='none'
				version='1.1'
				viewBox='0 0 300 90'
			>
				<g stroke='#d6d3d1' transform='translate(-.617)'>
					<circle id='bullseye' cx='149' cy='16' r='15.5'></circle>
					<path
						id='interruptedLane'
						d='M298 85c-32.431-38.566-79.9-64.31-133.5-68.422M1 85c32.229-38.326 79.31-63.99 132.5-68.342'
					></path>
					<path
						id='completeLane'
						strokeOpacity='0'
						d='M149.355 16c5.097 0 10.148.195 15.145.579C218.1 20.688 265.569 46.433 298 85M149.645 16c-5.437 0-10.822.222-16.145.658C80.31 21.01 33.229 46.674 1 85'
					></path>
				</g>
				<circle r='15.5' cx='0' cy='90' fill='#000'></circle>
			</svg>
		</div>
	);
};

export default TuningLane;
