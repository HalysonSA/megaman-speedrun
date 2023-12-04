import { Robot } from "@/types/robot";
import Card from "./robotCard";
import { useState } from "react";
import useSWR from "swr";
import { VscLoading } from "react-icons/vsc";
import { MdError } from "react-icons/md";

const RobotsCollection = () => {
  const [robots, setRobots] = useState<Robot[]>([]);

  const { data, error, isLoading } = useSWR(
    "https://megamanapi-deploy-render.onrender.com/robotmasters/sorted",
    async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    }
  );

  return (
    <>
      {isLoading && (
        <div className="w-full h-auto mt-24 flex justify-center items-center">
          <VscLoading className="animate-spin text-blue-800" size={64} />
        </div>
      )}
      {error && (
        <div className="w-full h-auto mt-24 flex flex-row justify-center items-center">
          <MdError className="text-red-500" size={64} />
          <p className="text-3xl pl-2 font-bold font-mega text-red-500">
            Error loading data
          </p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-8 mt-24 font-mega ">
        {data &&
          data.map((robot: Robot) => <Card key={robot.id} robot={robot} />)}
        {robots.map((robot) => (
          <Card key={robot.id} robot={robot} />
        ))}
      </div>
    </>
  );
};

export default RobotsCollection;
