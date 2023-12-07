"use client";
import { Robot } from "@/types/robot";
import { User } from "@/types/user";
import axios from "@/api/axios";
import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { UserContext } from "@/context/user";

interface FormValues {
  damageTaken: number;
  time: number;
}

const RobotScores = ({
  data,
}: {
  data: {
    time: number;
    damageTaken: number;
    user: User;
    robotMaster: Robot;
  }[];
}) => {
  const router = useRouter();
  const id = router.query.id;
  const [currentUser, setCurrentUser] = useState<User>({} as User);
  const [openMenu, setOpenMenu] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.username) {
      setCurrentUser(user);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    const { damageTaken, time } = data;

    const body = {
      damageTaken,
      time: "00:" + time,
      id: id,
    };

    axios
      .post("/robotlist/save", body, {
        auth: {
          username: "dudu",
          password: "12345",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
            {data?.map((score) => {
              return (
                <tr className=" h-12" key={score.robotMaster.id}>
                  <td>{score.time}</td>
                  <td>{score.damageTaken}</td>
                  <td>{score.user.username}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {currentUser.username && (
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

      {openMenu && currentUser.name && (
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
              value="Save"
              className="bg-blue-800 rounded-lg w-48 h-12 text-white hover:cursor-pointer"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default RobotScores;
