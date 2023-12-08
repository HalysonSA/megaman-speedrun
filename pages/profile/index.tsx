import axios from "@/api/axios";
import Layout from "@/components/layout";
import Loading from "@/components/results/loading";
import NoResults from "@/components/results/noResults";
import { UserContext } from "@/context/user";
import { Robot } from "@/types/robot";
import { User } from "@/types/user";
import { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { toast } from "react-toastify";
import useSWR from "swr";

export interface DefeatedRobot {
  id: string;
  damageTaken: number;
  time: number[];
  robotMaster: Robot;
  user: User;
}

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [defeatedRobots, setDefeatedRobots] = useState<DefeatedRobot[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getDefeatedRobots = async () => {
      if (user.username === undefined) return;

      try {
        const response = await axios.get("/robotlist/", {
          auth: {
            username: user.username,
            password: user.password,
          },
        });

        setDefeatedRobots(response.data.defeatedRobots);
      } catch (error) {
        console.error("Error fetching defeated robots:", error);
      } finally {
        setLoading(false);
      }
    };

    getDefeatedRobots();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({} as User);
    window.location.href = "/";
  };

  const handleDelete = async (id: string) => {
    toast
      .promise(
        axios.delete(`/robotlist/delete/${id}`, {
          auth: {
            username: user.username,
            password: user.password,
          },
        }),
        {
          pending: "Deleting robot...",
          success: "Successfully deleted robot",
          error: "Error deleting robot",
        }
      )
      .then(() => {
        const filtered = defeatedRobots.filter(
          (robot) => robot.robotMaster.id !== id
        );

        setDefeatedRobots(filtered);
      });
  };

  return (
    <Layout>
      <div className="w-11/12 mt-36 mb-8 max-w-7xl font-mega select-none">
        <h1 className="text-4xl font-bold">Hello {user.username}</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="flex flex-row items-center gap-2 text-white bg-red-500 border  rounded-lg px-4 py-2 mt-4"
        >
          <IoMdExit size={24} />
          Logout
        </button>
        <div className="flex flex-row justify-center items-center w-full mt-8">
          <h1 className="text-4xl  text-stroke font-bold">
            Your robots defeated
          </h1>
        </div>
        <div className="flex flex-col w-full my-4 overflow-scroll xl:overflow-hidden">
          {isLoading ? (
            <Loading />
          ) : defeatedRobots.length === 0 ? (
            <NoResults />
          ) : (
            <table>
              <tbody>
                <tr className="bg-blue-800 h-12  text-white ">
                  <th>Time</th>
                  <th>Damage Taken</th>
                  <th>Robot</th>
                  <th> Actions</th>
                </tr>
                {defeatedRobots?.map((data) => {
                  const { time, damageTaken, robotMaster } = data;

                  return (
                    <tr className=" h-12" key={robotMaster.id}>
                      <td>{time}</td>
                      <td>{damageTaken}</td>
                      <td>{robotMaster.name}</td>
                      <td>
                        <button
                          type="button"
                          className="bg-red-500 rounded-lg p-2 text-white hover:bg-red-600 duration-200 ease-in-out"
                          onClick={() => {
                            handleDelete(robotMaster.id);
                          }}
                        >
                          <FaTrash size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
