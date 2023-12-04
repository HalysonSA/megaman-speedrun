import Link from "next/link";
import SearchBar from "./searchBar";

const Navbar = () => {
  return (
    <div className="fixed z-50 font-mega flex justify-center top-8 w-11/12  p-2 h-auto sm:h-[80px] bg-blue-800 rounded-3xl">
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
        <div>
          <SearchBar />
        </div>
        <div className="sm:my-0 my-4">
          <Link
            href={"/profile"}
            passHref
            className="text-stroke font-bold text-xl cursor-pointer px-4"
          >
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
