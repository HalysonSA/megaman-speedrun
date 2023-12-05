import useSWR from "swr";
import { useRouter } from "next/router";
import { Robot } from "@/types/robot";
import { FaHeartBroken, FaRegHeart } from "react-icons/fa";
import { GrTarget } from "react-icons/gr";
import { MdError, MdOutlineBookmark } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import ErrorAlert from "@/components/results/error";
import NoResults from "@/components/results/noResults";
import Loading from "@/components/results/loading";

const RobotDetails = () => {
  const router = useRouter();
  const id = router.query.id;

  const { data, error, isLoading } = useSWR(
    `https://megamanapi-deploy-render.onrender.com/robotmasters/${id}`,
    async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      //check if data type is Robot
      if (data.name) {
        return data;
      } else {
        return null;
      }
    }
  );

  return (
    <div className="w-11/12 mt-36 font-mega select-none">
      {isLoading && <Loading />}
      {error && <ErrorAlert error="Error fetching data" />}
      {data != null ? (
        <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2   gap-4 w-full">
          <div className="flex flex-col items-start max-w-2xl ">
            <div className="flex flex-row justify-between items-center w-full">
              <h1 className="text-4xl  text-stroke font-bold">{data.name}</h1>
              <button className="p-2 rounded-full bg-white">
                <FaRegHeart />
              </button>
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

          <div className="flex flex-col items-center">
            <div className="flex flex-row justify-center items-center w-full">
              <h1 className="text-4xl  text-stroke font-bold">Best Scores</h1>
            </div>
            <div className="flex flex-col w-full overflow-scroll xl:overflow-hidden">
              <table className="p-2">
                <tr className="bg-blue-800 h-12  text-white ">
                  <th>Time</th>
                  <th>Damage Taken</th>
                  <th>User</th>
                </tr>
                <tr className="h-12">
                  <td>00:00:00</td>
                  <td>0</td>
                  <td>Player1asdasda</td>
                </tr>
                <tr className=" h-12">
                  <td>00:00:00</td>
                  <td>0</td>
                  <td>Player1asdfsdafsdfgsgsdfg</td>
                </tr>
                <tr className="h-12">
                  <td>00:00:00</td>
                  <td>0</td>
                  <td>jiohasdfngjsdbgjksdgbfkdjsgbjhjkasdfhjsfbhsda</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <NoResults />
      )}
    </div>
  );
};

export default RobotDetails;
