import Link from "next/link";
import SearchBar from "./searchBar";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext, useState } from "react";
import { UserContext } from "@/context/user";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const router = useRouter();

  const { user } = useContext(UserContext);

  const goToProfile = () => {
    if (!user.username) return router.push("/signin");
    router.push("/profile");
  };

  return (
    <div className="fixed z-50 font-mega max-w-7xl flex justify-center top-8 w-11/12  p-2 h-auto sm:h-[80px] bg-blue-800 rounded-3xl">
      <div className="w-full flex flex-row flex-wrap items-center justify-between px-2 sm:px-8 py-2">
        <div>
          <Link
            href={"/"}
            passHref
            className="text-stroke font-bold text-2xl cursor-pointer px-4"
          >
            Robot Master
          </Link>
        </div>

        <div className="block sm:hidden px-4">
          <button type="button" onClick={() => setShowMenu(!showMenu)}>
            <GiHamburgerMenu className="text-white text-3xl cursor-pointer" />
          </button>
        </div>
        {!showMenu && (
          <div className="hidden sm:flex">
            <SearchBar />
          </div>
        )}

        {!showMenu && (
          <div className="hidden sm:flex">
            <button
              onClick={goToProfile}
              className="text-stroke font-bold text-xl cursor-pointer px-4"
            >
              Profile
            </button>
          </div>
        )}

        {showMenu && (
          <div className="flex flex-col-reverse sm:flex-row items-center justify-center sm:justify-between w-full sm:w-auto">
            <div>
              <SearchBar />
            </div>
            <div className="sm:my-0 my-4 mx-2">
              <button
                onClick={goToProfile}
                className="text-stroke font-bold text-xl cursor-pointer px-4"
              >
                Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
