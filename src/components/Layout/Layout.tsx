import Header from '../Header/Header';

const Layout = ({ children }: { children: JSX.Element }) => {
	return (
		<div className='w-full h-screen bg-black font-sans text-stone-300'>
			<div className='fixed top-0 left-0 h-1/3 w-full backdrop-blur-xl'>
				<div className='w-full h-full bg-gradient-to-b from-[#1e013690] via-[#1a050fab]'></div>
			</div>
			<Header />
			<div className='h-full flex flex-col items-center justify-center'>
				<main className='w-[85vw] mx-auto'>{children}</main>
			</div>
		</div>
	);
};

export default Layout;
