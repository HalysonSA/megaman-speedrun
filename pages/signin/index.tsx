import axios from "@/api/axios";
import { UserContext } from "@/context/user";
import Link from "next/link";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

interface SignInFormValues {
  username: string;
  password: string;
  keepLoggedIn: boolean;
}

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser, user } = useContext(UserContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInFormValues>({});

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);

    const body = {
      username: data.username,
      password: data.password,
    };

    axios
      .post("/users/login", body)
      .then((res) => {
        setUser({
          username: res.data.username,
          name: res.data.name,
          password: data.password,
        });

        toast.success("Login realizado com sucesso!");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error("Usuário ou senha incorretos!");
          return;
        }
        toast.error("Algo deu errado, tente novamente!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  });
  return (
    <div className="flex justify-center items-center w-full min-h-screen px-2 sm:px-12  py-8 h-screen">
      <div className="w-full h-5/6 relative bg-white rounded-2xl grid lg:grid-cols-2 shadow-2xl max-w-7xl max-h-[900px]">
        <div className="bg-blue-800 hidden  lg:flex flex-col  justify-center items-center scale-105 rounded-3xl ">
          <div className="text-white z-10">
            <h1 className="text-3xl font-bold">WELCOME BACK!</h1>
            <p className="text-lg">Don't have an account?</p>
          </div>
          <Link
            href="/signup"
            passHref
            className=" uppercase z-10 py-6 px-4 text-xl flex flex-row justify-center items-center bg-white font-semibold text-blue-800 rounded-full w-1/3 mt-4"
          >
            Sign Up
          </Link>
          <img
            src="/megaman.svg"
            alt="Megaman"
            className="absolute bottom-0 right-6 z-0"
          />
        </div>

        <div className="flex justify-center items-center h-full">
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4 w-10/12 sm:w-8/12"
          >
            <h1 className="text-4xl font-bold text-blue-800 my-4">Sign In</h1>
            <div className="flex flex-col justify-start">
              <label htmlFor="username" className="text-2xl">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="h-14 w-full text-2xl border p-2  border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                {...register("username", { required: true })}
              />
              {errors.username && <span>Username is required</span>}
            </div>

            <div className="relative flex  flex-col justify-start">
              <label htmlFor="password" className="text-2xl">
                Password
              </label>
              <div className="relative flex flex-row items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="h-14 w-full text-2xl border p-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  className="absolute right-4"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FaEye size={24} />
                </button>
              </div>
              {errors.password && <span>Password is required</span>}
            </div>

            <div className="flex flex-row items-center ">
              <input
                type="checkbox"
                id="keepLoggedIn"
                className="h-6 w-6"
                {...register("keepLoggedIn")}
              />
              <label htmlFor="keepLoggedIn" className="pl-2">
                Keep me logged in
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full p-4 rounded-full bg-blue-800 text-xl font-semibold text-white"
              >
                {isLoading ? (
                  <div className="flex flex-row justify-center items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </div>
            <div className="lg:hidden flex flex-row justify-center items-center">
              <span className="border-b border-black w-1/3"></span>
              <span className="text-xl mx-4">OR</span>
              <span className="border-b border-black w-1/3"></span>
            </div>

            <Link className="lg:hidden flex" passHref href={"/signup"}>
              <p className="text-gray-800">
                Don't have an account?{" "}
                <b className="text-blue-800"> sign up </b>
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
