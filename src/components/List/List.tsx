const List = ({ children }: { children: JSX.Element[] }) => {
	return (
		<div id='list' className='flex flex-col'>
			{children.map((element, i) => (
				<div
					id='list-child-container'
					key={i}
					className='border-y border-neutral-800 flex flex-col justify-center cursor-pointer hover:bg-stone-900 transition-colors'
				>
					{element}
				</div>
			))}
		</div>
	);
};

export default List;
