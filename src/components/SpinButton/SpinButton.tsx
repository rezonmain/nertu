import { useState } from 'react';
import { BiPlus, BiMinus } from 'react-icons/bi';

const SpinButton = ({
	value,
	onChange,
}: {
	value: number;
	onChange: (value: number) => void;
}) => {
	const handleClick = (e: React.MouseEvent<HTMLDivElement>, op: number) => {
		e.stopPropagation();
		onChange(value + op);
	};
	return (
		<div className='flex flex-row justify-center items-center gap-3'>
			<span className='text-stone-400'>{value} hz</span>
			<div className='flex flex-row'>
				<div
					onClick={(e) => handleClick(e, -1)}
					className='px-2 py-0.5 border-2 border-stone-500 text-stone-500 border-r-0 rounded-md rounded-r-none flex justify-center items-center'
				>
					<BiMinus size={20} />
				</div>
				<div
					onClick={(e) => handleClick(e, 1)}
					className='px-2 py-0.5 border-2 border-fuchsia-600 text-fuchsia-500 rounded-md rounded-l-none flex justify-center items-center'
				>
					<BiPlus size={20} />
				</div>
			</div>
		</div>
	);
};

export default SpinButton;
