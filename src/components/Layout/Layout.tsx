const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <div
        id="bg-gradient"
        className="fixed top-0 left-0 h-1/3 w-full backdrop-blur-xl bg-gradient-to-b from-[#1e013690] via-[#1a050fab] -z-10"
      ></div>
      <div id="app" className="w-full h-screen">
        {children}
      </div>
    </>
  );
};

export default Layout;
