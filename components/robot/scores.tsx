"use client";
import { Robot } from "@/types/robot";
import { User } from "@/types/user";

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
                <tr className=" h-12 ">
                  <td>{score.time}</td>
                  <td>{score.damageTaken}</td>
                  <td>{score.user.username}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RobotScores;
