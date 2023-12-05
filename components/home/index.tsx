import { Robot } from "@/types/robot";
import Card from "./robotCard";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { VscLoading } from "react-icons/vsc";
import { MdError } from "react-icons/md";
import { useRouter } from "next/router";
import ErrorAlert from "../results/error";
import Loading from "../results/loading";
import NoResults from "../results/noResults";

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
    <div className="w-full mt-36">
      {isLoading && <Loading />}
      {error && <ErrorAlert error="Error fetching data" />}
      {robots?.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-8 md:grid-cols-3 lg:grid-cols-4   font-mega  ">
        {data && robots?.map((robot) => <Card key={robot.id} robot={robot} />)}
      </div>
    </div>
  );
};

export default RobotsCollection;
