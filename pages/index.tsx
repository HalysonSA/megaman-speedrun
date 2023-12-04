import Navbar from "@/components/layout/navbar";
import RobotsCollection from "@/components/home";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <Navbar />
      <RobotsCollection />
    </main>
  );
}
