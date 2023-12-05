import { VscLoading } from "react-icons/vsc";

const Loading = () => {
  return (
    <div className="w-full h-auto  flex justify-center items-center">
      <VscLoading className="animate-spin text-blue-800" size={64} />
    </div>
  );
};

export default Loading;
