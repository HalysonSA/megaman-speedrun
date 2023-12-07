import { useForm } from "react-hook-form";

interface SignInFormValues {
  username: string;
  password: string;
  keepLoggedIn: boolean;
}

const SignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInFormValues>({});

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <div className="flex justify-center items-center w-full h-full px-12 py-8">
      <div className="w-full bg-white rounded-2xl grid grid-cols-2  shadow-2xl">
        <div className="bg-blue-800 flex flex-col  rounded-3xl">
          <div>
            <h1>WELCOME BACK!</h1>
            <p>Don't have an account?</p>
          </div>

          <button>Sign Up</button>
        </div>

        <div className="flex justify-center items-center">
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                {...register("username", { required: true })}
              />
              {errors.username && <span>Username is required</span>}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password", { required: true })}
              />
              {errors.password && <span>Password is required</span>}
            </div>

            <div>
              <input
                type="checkbox"
                id="keepLoggedIn"
                {...register("keepLoggedIn")}
              />
              <label htmlFor="keepLoggedIn">Keep me logged in</label>
            </div>

            <div>
              <button type="submit">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
