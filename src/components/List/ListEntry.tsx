const ListEntry = ({
	title,
	description,
	children,
}: {
	title: string;
	description?: string | JSX.Element;
	children?: JSX.Element;
}) => {
	return (
		<div className='flex flex-row justify-between items-center gap-2'>
			<div>
				<h3 className='font-semibold'>{title}</h3>
				<p className='text-stone-400 text-sm'>{description}</p>
			</div>
			<div>{children}</div>
		</div>
	);
};

export default ListEntry;
