import { MdError } from "react-icons/md";

const NoResults = () => {
  return (
    <div className="w-full h-auto flex flex-row justify-center items-center p-4">
      <MdError className="text-blue-500" size={64} />
      <p className="text-3xl pl-2 font-bold font-mega text-blue-500">
        No results found
      </p>
    </div>
  );
};
export default NoResults;
