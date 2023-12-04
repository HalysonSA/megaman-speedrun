import { Robot } from "@/types/robot";
import Link from "next/link";
import { useState } from "react";
import { FaHeartBroken } from "react-icons/fa";
import { GrTarget } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";

const Card = ({ robot }: { robot: Robot }) => {
  const { name, weapon, weakness, sprite } = robot;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/robots/${robot.id}`}
      passHref
      className={`border  duration-200 ease-in-out relative rounded-2xl p-4 w-72 h-96 shadow-blue cursor-pointer `.concat(
        isHovered ? "border-2 border-blue-800 shadow-blueLg" : "border-0"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <img
          src={sprite}
          alt="robot1"
          className="w-44 h-44 object-contain rounded-sm mx-auto"
        />
      </div>
      <div className="text-center my-4">
        <h1 className="text-4xl font-mega text-stroke font-bold">{name}</h1>
      </div>
      <div className="grid grid-flow-col grid-rows-2 gap-2 font-mega">
        <span className="flex flex-row items-center">
          <FaHeartBroken className="text-red-500 " size={24} />
          <p className="text-lg pl-2">{weakness}</p>
        </span>
        <span className="flex flex-row items-center">
          <GrTarget className=" text-blue-800" size={24} />
          <p className="text-lg pl-2">{weapon}</p>
        </span>
      </div>

      {isHovered && (
        <>
          <div className="absolute  w-full h-full top-0 left-0 flex flex-col bg-blue-800 bg-opacity-50 rounded-xl shadow-inner">
            <div className="flex justify-center h-full w-full items-center">
              <Link
                className="rounded-full w-auto  p-2 border "
                href={`/robots/${robot.id}`}
                passHref
              >
                <IoMdSearch
                  className="text-neutral-200   duration-200 ease-in"
                  size={48}
                />
              </Link>
            </div>
          </div>
        </>
      )}
    </Link>
  );
};

export default Card;
