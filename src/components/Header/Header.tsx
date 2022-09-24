import { BsGear } from 'react-icons/bs';
const Header = ({ onSettings }: { onSettings: () => void }) => {
	return (
		<header className='fixed top-0 w-full h-fit p-5 text-stone-300'>
			<div className='sm:max-w-3xl xl:px-0 xl:max-w-5xl mx-auto flex flex-row items-center justify-between'>
				<div id='icon'>
					<span className='text-3xl'>nertu</span>
				</div>
				<div
					onClick={onSettings}
					className='cursor-pointer hover:rotate-45 transition-transform p-2'
				>
					<BsGear size={30} />
				</div>
			</div>
		</header>
	);
};

export default Header;