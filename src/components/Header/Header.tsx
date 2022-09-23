import { BsGear } from 'react-icons/bs';
const Header = () => {
	return (
		<header className='fixed top-0 left-0 w-full h-fit p-5 flex flex-row items-center justify-between text-stone-300'>
			<div id='icon'>
				<span className='text-3xl'>nertu</span>
			</div>
			<div className='cursor-pointer hover:rotate-45 transition-transform'>
				<BsGear size={30} />
			</div>
		</header>
	);
};

export default Header;
