"use client";
import axios from "@/api/axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { UserContext } from "@/context/user";
import { toast } from "react-toastify";
import { DefeatedRobot } from "@/pages/profile";
import NoResults from "../results/noResults";

interface FormValues {
  damageTaken: number;
  time: number;
}

const RobotScores = ({ data }: { data: DefeatedRobot[] }) => {
  const router = useRouter();
  const id = router.query.id;

  const [openMenu, setOpenMenu] = useState(false);
  const [isDefeated, setIsDefeated] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (data) {
      data.map((score) => {
        if (score.user.username === user.username) {
          setIsDefeated(true);
        }
      });
    }
  }, [user]);

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    const { damageTaken, time } = data;

    const body = {
      damageTaken,
      time: "00:" + time,
      id: id,
    };

    toast
      .promise(
        axios.post("/robotlist/save", body, {
          auth: {
            username: user.username,
            password: user.password,
          },
        }),
        {
          pending: "Saving...",
          success: "Score saved",
          error: "Error saving score",
        }
      )
      .finally(() => {
        setLoading(false);
        router.reload();
      });
  });

  return (
    <div className="flex flex-col items-center sm:w-3/5">
      <div className="flex flex-row justify-center items-center w-full">
        <h1 className="text-4xl  text-stroke font-bold">Best Scores</h1>
      </div>
      <div className="flex flex-col w-full my-4 overflow-scroll xl:overflow-hidden">
        <table>
          <tbody>
            <tr className="bg-blue-800 h-12  text-white ">
              <th>Time</th>
              <th>Damage Taken</th>
              <th>User</th>
            </tr>
            {data.length === 0 ? (
              <NoResults />
            ) : (
              data?.map((score) => {
                const { time, damageTaken } = score;

                return (
                  <tr className=" h-12" key={score.robotMaster.id}>
                    <td>{time}</td>
                    <td>{damageTaken}</td>
                    <td>{score.user.username}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {user.username && !isDefeated && (
        <div className="flex flex-row justify-start items-center w-full">
          <button
            className="bg-blue-800 rounded-lg w-48 h-12 text-white"
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
          >
            Add Score
          </button>
        </div>
      )}

      {openMenu && user.name && (
        <form
          className="bg-white w-full flex flex-col gap-2 p-4 rounded-2xl mt-2"
          onSubmit={onSubmit}
        >
          <div className="flex items-start flex-col justify-end">
            <h1 className="text-md text-center">Damage Taken</h1>
            <input
              {...register("damageTaken", { required: true })}
              className="w-full h-12 border p-2 border-blue-800 rounded-lg focus:outline-none"
              placeholder="how much damage you took"
              type="number"
            />
          </div>
          <div className="flex items-start flex-col justify-end">
            <h1 className="text-md text-center">Time</h1>
            <input
              {...register("time", { required: true })}
              className="w-full h-12 border p-2 border-blue-800 rounded-lg focus:outline-none"
              placeholder="Time"
              type="time"
            />
          </div>
          <div className="flex justify-end">
            <input
              type="submit"
              value={isLoading ? "Saving..." : "Save"}
              className="bg-blue-800 rounded-lg w-48 h-12 text-white hover:cursor-pointer"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default RobotScores;
