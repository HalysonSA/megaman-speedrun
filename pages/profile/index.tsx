import Layout from "@/components/layout";
import { UserContext } from "@/context/user";
import { User } from "@/types/user";
import { useContext } from "react";
import { IoMdExit } from "react-icons/io";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({} as User);
    window.location.href = "/";
  };

  return (
    <Layout>
      <div className="w-11/12 mt-36 mb-8 max-w-7xl font-mega select-none">
        <h1 className="text-4xl font-bold">Profile</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="flex flex-row items-center gap-2 text-white bg-red-500 border  rounded-lg px-4 py-2 mt-4"
        >
          <IoMdExit size={24} />
          Logout
        </button>
      </div>
    </Layout>
  );
};

export default ProfilePage;
