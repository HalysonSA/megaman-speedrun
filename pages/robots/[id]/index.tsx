import Layout from "@/components/layout";
import ErrorAlert from "@/components/results/error";
import Loading from "@/components/results/loading";
import NoResults from "@/components/results/noResults";
import RobotDetails from "@/components/robot/details";
import RobotScores from "@/components/robot/scores";
import { DefeatedRobot } from "@/pages/profile";
import { Robot } from "@/types/robot";

const RobotDetailsPage = ({
  data,
  dataScores,
  error,
  isLoading,
}: {
  data: Robot;
  dataScores: DefeatedRobot[];
  error: string;
  isLoading: boolean;
}) => {
  return (
    <Layout>
      <div className="w-11/12 mt-36 mb-8 max-w-7xl font-mega select-none">
        {isLoading && <Loading />}
        {error && <ErrorAlert error="Error fetching data" />}
        {data != null && (
          <div className="flex flex-col md:flex-row gap-4 w-full ">
            <RobotDetails data={data} />
            <RobotScores data={dataScores} />
          </div>
        )}
        {data == null && !isLoading && !error && <NoResults />}
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "05d71945-2a68-4b49-84b1-dd8e1ef686ae" } },
      { params: { id: "15255432-49c2-4ddd-9639-31914c2e0dd7" } },
      { params: { id: "9485b196-c7f8-4ded-92c7-7bcd6fa2f2eb" } },
      { params: { id: "8f7595c9-679e-43fd-b02e-91da439e206e" } },
      { params: { id: "bdf3d976-4b54-4970-8667-f385dba099f4" } },
      { params: { id: "714ef7ef-832e-4e43-a01d-72d0197c65b7" } },
      { params: { id: "6a197a31-2c27-4457-a2f5-dddd562a5f7f" } },
      { params: { id: "436198a4-d040-4349-bfda-27a17ae40d5b" } },
      { params: { id: "733cb60b-58db-4cc4-ae48-81281ce28643" } },
      { params: { id: "fc03eebd-5f91-4cfc-9063-a11ebc1ec007" } },
      { params: { id: "ef8f9764-1dcd-436b-9825-3b6580ecc89b" } },
      { params: { id: "e2a4eee3-da8c-45fd-a335-0af82467799f" } },
      { params: { id: "81221ba7-76a6-4abd-8fa3-ee0535da0219" } },
      { params: { id: "0911b8bb-6985-4179-aa34-8f39b2ebf5e1" } },
      { params: { id: "594a089c-47fc-4701-a601-6d5b703a23ec" } },
      { params: { id: "1b9e9156-7329-406a-af7b-3a6d6a122a89" } },
      { params: { id: "464d098d-9244-4bad-a9ce-bc3d2c0bfcee" } },
      { params: { id: "36613765-730b-42f2-b149-76e445e53f1b" } },
      { params: { id: "3ebba9af-fba0-479e-af9a-d2f880e05a0c" } },
      { params: { id: "827a74bb-0292-4138-a79f-315edadebadc" } },
      { params: { id: "52f99e72-11a7-41d0-ba5b-3cedfccb4b79" } },
      { params: { id: "9537f450-d016-4824-b35b-0c4ba5139472" } },
      { params: { id: "c8df5f5b-f509-4a85-9eb3-e22f26fe1f27" } },
      { params: { id: "e918c6dc-c063-464d-9e35-9cf2d1fbedd8" } },
      { params: { id: "acfeca6a-3365-4f48-9c79-bc66cea25b9a" } },
      { params: { id: "fd8723af-4951-4005-846d-02152d0d2d2d" } },
      { params: { id: "66e5ef4f-110e-40d6-84e8-41c0b2afd955" } },
      { params: { id: "e8904d07-f08e-426d-b647-5e382404b2cb" } },
      { params: { id: "cfeedaba-056f-4536-82e4-4aed0ac0bac0" } },
      { params: { id: "63aec988-eafb-4fcf-9d81-16e6fba2f769" } },
      { params: { id: "b1a77491-069f-45fe-8204-16ecdaacb9be" } },
      { params: { id: "1f53ed6e-2946-4756-a0c3-5d7122d393a7" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  try {
    const res = await fetch(
      `https://megamanapi-deploy-render.onrender.com/robotmasters/${params.id}`
    );
    const resScores = await fetch(
      `https://megamanapi-deploy-render.onrender.com/robotmasters/score/${params.id}`
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
        revalidate: 15, // In seconds
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
