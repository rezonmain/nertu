const Layout = ({ children }: { children: JSX.Element }) => {
	return (
		<div className='w-full h-screen bg-stone-900 font-mono text-white'>
			{children}
		</div>
	);
};

export default Layout;
