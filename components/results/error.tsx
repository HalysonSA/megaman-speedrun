import { MdError } from "react-icons/md";

const ErrorAlert = ({ error }: { error: string }) => {
  return (
    <div className="w-full h-auto  flex flex-row justify-center items-center">
      <MdError className="text-red-500" size={64} />
      <p className="text-3xl pl-2 font-bold font-mega text-red-500">{error}</p>
    </div>
  );
};

export default ErrorAlert;
