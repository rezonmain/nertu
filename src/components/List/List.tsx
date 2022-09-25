const List = ({ children }: { children: JSX.Element[] }) => {
	return (
		<div className='flex flex-col'>
			{children.map((element, i) => (
				<div
					key={i}
					className='border-y border-neutral-800 flex flex-col justify-center cursor-pointer hover:bg-stone-900 transition-colors'
				>
					<div className='px-7 py-3'>{element}</div>
				</div>
			))}
		</div>
	);
};

export default List;
