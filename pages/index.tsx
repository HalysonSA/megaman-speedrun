import RobotsCollection from "@/components/home";
import Layout from "@/components/layout";

export default function Home() {
  return (
    <Layout>
      <main className="h-auto flex justify-center p-4 w-11/12">
        <RobotsCollection />
      </main>
    </Layout>
  );
}
