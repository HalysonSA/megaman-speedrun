import { Robot } from "@/types/robot";
import { FaHeartBroken } from "react-icons/fa";
import { GrTarget } from "react-icons/gr";
import { MdOutlineBookmark } from "react-icons/md";

const RobotDetails = ({ data }: { data: Robot }) => {
  return (
    <div className="flex flex-col items-start max-w-2xl sm:w-2/5">
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="text-4xl  text-stroke font-bold">{data.name}</h1>
      </div>

      <div className="flex flwx-row my-4 overflow-x-auto bg-white ">
        <img
          src={data.avatar}
          alt="robot1"
          className="w-44 h-44 md:w-80 md:h-80 object-contain rounded-sm mx-auto"
        />

        <img
          src={data.sprite}
          alt="robot1"
          className=" w-44 h-44 md:w-80 md:h-80 object-contain rounded-sm mx-auto"
        />
      </div>

      <div className="grid grid-flow-col grid-rows-3 gap-2 ">
        <span className="flex flex-row items-center">
          <span className="p-2 rounded-full bg-white">
            <FaHeartBroken className="text-red-500 " size={24} />
          </span>
          <p className="text-2xl pl-2">{data.weakness}</p>
        </span>
        <span className="flex flex-row items-center">
          <span className="p-2 rounded-full bg-white">
            <GrTarget className=" text-blue-800" size={24} />
          </span>
          <p className="text-2xl pl-2">{data.weapon}</p>
        </span>
        <span className="flex flex-row items-center">
          <span className="p-2 rounded-full bg-white">
            <MdOutlineBookmark className="text-yellow-500" size={24} />
          </span>
          <p className="text-2xl pl-2">Serie {data.series}</p>
        </span>
      </div>
    </div>
  );
};

export default RobotDetails;
