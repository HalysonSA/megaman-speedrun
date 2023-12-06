import ErrorAlert from "@/components/results/error";
import Loading from "@/components/results/loading";
import NoResults from "@/components/results/noResults";
import RobotDetails from "@/components/robot/details";
import RobotScores from "@/components/robot/scores";
import { Robot } from "@/types/robot";

const RobotDetailsPage = ({
  data,
  dataScores,
  error,
  isLoading,
}: {
  data: Robot;
  dataScores: any;
  error: string;
  isLoading: boolean;
}) => {
  return (
    <div className="w-11/12 mt-36 font-mega select-none">
      {isLoading && <Loading />}
      {error && <ErrorAlert error="Error fetching data" />}
      {data != null && (
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <RobotDetails data={data} />
          <RobotScores data={dataScores} />
        </div>
      )}
      {data == null && !isLoading && !error && <NoResults />}
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const id = context.params.id;

  try {
    const res = await fetch(
      `https://megamanapi-deploy-render.onrender.com/robotmasters/${id}`
    );
    const resScores = await fetch(
      `https://megamanapi-deploy-render.onrender.com/robotmasters/score/${id}`
    );
    const dataScores = await resScores.json();
    const data = await res.json();

    if (data.name) {
      return {
        props: {
          data,
          dataScores,
          error: null,
          isLoading: false,
        },
      };
    } else {
      return {
        props: {
          data: null,
          dataScores: null,
          error: "Data not found",
          isLoading: false,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        data: null,
        dataScores: null,
        error: "Error fetching data",
        isLoading: false,
      },
    };
  }
}

export default RobotDetailsPage;
