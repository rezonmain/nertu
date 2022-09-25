const List = ({ children }: { children: JSX.Element[] }) => {
	return (
		<div id='list' className='flex flex-col'>
			{children.map((element, i) => (
				<div
					id='list-child-container'
					key={i}
					className='border-b border-neutral-800 flex flex-col justify-center cursor-pointer active:bg-stone-900 transition-colors'
				>
					{element}
				</div>
			))}
		</div>
	);
};

export default List;
