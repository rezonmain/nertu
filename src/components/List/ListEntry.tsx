const ListEntry = ({
	title,
	description,
}: {
	title: string;
	description?: string;
}) => {
	return (
		<div className='flex flex-row justify-between items-center'>
			<div>
				<h3 className='font-semibold text-lg'>{title}</h3>
				<p className='text-stone-400'>{description}</p>
			</div>
			<div>control</div>
		</div>
	);
};

export default ListEntry;
