import Navbar from "./navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row justify-center w-full">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
