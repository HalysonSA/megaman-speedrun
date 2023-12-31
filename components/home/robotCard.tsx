import { Robot } from "@/types/robot";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaHeartBroken } from "react-icons/fa";
import { GrTarget } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";

const Card = ({ robot }: { robot: Robot }) => {
  const { name, weapon, weakness, sprite } = robot;
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => {
        router && router.push(`/robots/${robot.id}`);
      }}
      className={`border bg-white max-w-md  duration-200 ease-in-out relative rounded-2xl p-4 h-96 shadow-blue cursor-pointer  `.concat(
        isHovered ? "border-2 border-blue-800 shadow-blueLg" : "border-0"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <img
          src={sprite}
          alt="robot1"
          className=" w-44 h-44 object-contain rounded-sm mx-auto"
        />
      </div>
      <div className="text-center my-4">
        <h1 className=" text-2xl md:text-4xl font-mega text-stroke font-bold ">
          {name}
        </h1>
      </div>
      <div className="grid grid-flow-col grid-rows-2 gap-2 font-mega">
        <span className="flex flex-row items-center">
          <FaHeartBroken className="text-red-500 " size={24} />
          <p className="text-md md:text-lg pl-2">{weakness}</p>
        </span>
        <span className="flex flex-row items-center">
          <GrTarget className=" text-blue-800" size={24} />
          <p className="text-md md:text-lg pl-2">{weapon}</p>
        </span>
      </div>

      {isHovered && (
        <>
          <div className="absolute  w-full h-full top-0 left-0 flex flex-col bg-blue-800 bg-opacity-20 rounded-xl shadow-inner">
            <div className="flex justify-end h-full w-full items-start">
              <Link
                className="rounded-full w-auto  p-2 border mr-2 mt-2 border-blue-800 "
                href={`/robots/${robot.id}`}
                passHref
              >
                <IoMdSearch
                  className="text-blue-800 duration-200 ease-in"
                  size={48}
                />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
