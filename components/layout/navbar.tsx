import Link from "next/link";

const Navbar = () => {
  return (
    <div className=" fixed z-50  font-mega  flex justify-center top-8 w-11/12 p-2 h-auto sm:h-[80px] bg-blue-800 rounded-3xl">
      <div className="w-full flex flex-row flex-wrap items-center justify-between  px-2 sm:px-8 py-2">
        <div>
          <Link
            href={"/"}
            className="text-stroke  font-bold text-2xl cursor-pointer px-4"
          >
            Robot Master
          </Link>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            className="rounded-2xl px-4 py-2 bg-blue-600 text-white
                focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50
            
            "
          />
        </div>
        <div className="sm:my-0  my-4">
          <Link
            href={"/profile"}
            className="text-stroke  font-bold text-xl cursor-pointer px-4 "
          >
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
