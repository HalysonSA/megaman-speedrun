import { useContext, useEffect } from "react";
import Navbar from "./navbar";
import { UserContext } from "@/context/user";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);
  return (
    <div className="flex flex-row justify-center w-full">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
