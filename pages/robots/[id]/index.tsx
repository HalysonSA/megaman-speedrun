import useSWR from "swr";
import { useRouter } from "next/router";
import { Robot } from "@/types/robot";
import { FaHeartBroken } from "react-icons/fa";
import { GrTarget } from "react-icons/gr";
const RobotDetails = () => {
  const router = useRouter();
  const id = router.query.id;

  const { data, error, isLoading } = useSWR(
    `https://megamanapi-deploy-render.onrender.com/robotmasters/${id}`,
    async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      return data as Robot;
    }
  );

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading data</p>}
      {data && (
        <div className="flex flex-col items-center">
          <img
            src={data.sprite}
            alt="robot1"
            className="w-44 h-44 object-contain rounded-sm mx-auto"
          />
          <h1 className="text-4xl font-mega text-stroke font-bold">
            {data.name}
          </h1>
          <div className="grid grid-flow-col grid-rows-2 gap-2 font-mega">
            <span className="flex flex-row items-center">
              <FaHeartBroken className="text-red-500 " size={24} />
              <p className="text-lg pl-2">{data.weakness}</p>
            </span>
            <span className="flex flex-row items-center">
              <GrTarget className=" text-blue-800" size={24} />
              <p className="text-lg pl-2">{data.weapon}</p>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RobotDetails;
