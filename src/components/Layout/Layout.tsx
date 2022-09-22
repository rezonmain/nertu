const Layout = ({ children }: { children: JSX.Element }) => {
	return (
		<div className='w-full h-screen bg-stone-800 font-mono text-white'>
			{children}
		</div>
	);
};

export default Layout;
