const ListEntry = ({
	title,
	description,
	children,
	onClick,
}: {
	title: string;
	description?: string | JSX.Element;
	children?: JSX.Element;
	onClick?: () => void;
}) => {
	return (
		<div
			onClick={onClick}
			className='flex flex-row justify-between items-center gap-2 select-none'
		>
			<div>
				<h3 className='font-semibold'>{title}</h3>
				<p className='text-stone-400 text-sm'>{description}</p>
			</div>
			<div>{children}</div>
		</div>
	);
};

export default ListEntry;
