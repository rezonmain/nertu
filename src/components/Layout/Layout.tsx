const Layout = ({ children }: { children: JSX.Element }) => {
	return (
		<>
			<div className='fixed top-0 left-0 w-full h-screen bg-black -z-20'></div>
			<div
				id='bg-gradient'
				className='fixed top-0 left-0 h-1/3 w-full backdrop-blur-xl -z-10'
			>
				<div className='w-full h-full bg-gradient-to-b from-[#1e013690] via-[#1a050fab]'></div>
			</div>
			<main className='w-full h-screen'>{children}</main>
		</>
	);
};

export default Layout;
