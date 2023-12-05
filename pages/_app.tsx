import Navbar from "@/components/layout/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-row justify-center w-full">
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
