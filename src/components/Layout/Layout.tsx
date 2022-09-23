const Layout = ({ children }: { children: JSX.Element }) => {
	return (
		<div className='w-full h-screen bg-stone-800 font-sans text-white'>
			<main className='w-[85vw] mx-auto'>{children}</main>
		</div>
	);
};

export default Layout;
