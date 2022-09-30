import React from 'react';
import { BsGear } from 'react-icons/bs';
const Header = ({ onSettings }: { onSettings: () => void }) => {
	return (
		<header className='fixed top-0 w-full h-fit p-5 text-stone-300 short:opacity-0 transition-opacity'>
			<div
				id='header-items'
				className='sm:max-w-3xl xl:px-0 xl:max-w-5xl mx-auto flex flex-row items-center justify-between'
			>
				<div id='icon'>
					<span className='text-3xl'>nertu</span>
				</div>
				<button
					name='settings'
					id='settings-icon'
					onClick={onSettings}
					className='cursor-pointer hover:rotate-45 transition-transform p-2'
				>
					<BsGear size={30} />
				</button>
			</div>
		</header>
	);
};

export default React.memo(Header);
