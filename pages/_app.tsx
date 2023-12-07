import Navbar from "@/components/layout/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@/context/user";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </UserProvider>
  );
}
