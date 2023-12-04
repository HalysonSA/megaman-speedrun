import { Robot } from "@/types/robot";
import Card from "./robotCard";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { VscLoading } from "react-icons/vsc";
import { MdError } from "react-icons/md";
import { useRouter } from "next/router";

const RobotsCollection = () => {
  const [robots, setRobots] = useState<Robot[]>([]);
  const router = useRouter();

  const { search } = router.query;

  const {
    data,
    error,
    isLoading,
  }: {
    data: Robot[];
    error: any;
    isLoading: boolean;
  } = useSWR(
    "https://megamanapi-deploy-render.onrender.com/robotmasters/sorted",
    async (url) => {
      const res = await fetch(url);
      const data = await res.json();

      const filteredRobots = data?.filter((robot: Robot) => {
        if (search === undefined) return true;

        return robot.name
          .toLowerCase()
          .includes(search.toString().toLowerCase());
      });
      setRobots(filteredRobots);

      return data;
    }
  );

  useEffect(() => {
    const filteredRobots = data?.filter((robot: Robot) => {
      if (search === undefined) return true;

      return robot.name.toLowerCase().includes(search.toString().toLowerCase());
    });
    setRobots(filteredRobots);
  }, [search]);

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
      {robots?.length === 0 && (
        <div className="w-full h-auto mt-24 flex flex-row justify-center items-center">
          <MdError className="text-blue-500" size={64} />
          <p className="text-3xl pl-2 font-bold font-mega text-blue-500">
            No results found
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-8 md:grid-cols-3 lg:grid-cols-4  mt-36 font-mega  ">
        {data && robots?.map((robot) => <Card key={robot.id} robot={robot} />)}
      </div>
    </>
  );
};

export default RobotsCollection;
