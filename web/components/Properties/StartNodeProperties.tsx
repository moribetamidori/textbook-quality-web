import { StatusContext } from "@/contexts/StatusContext";
import { useContext } from "react";

function StartNodeProperties({ data }: any) {
  const { handleSubmit, node_id00 } = useContext(StatusContext);

  return (
    <>
      <div className="flex flex-col border border-solid border-black h-full rounded-sm  bg-gradient-to-r from-[#FFBFF1]/40 to-[#1D1D1D] shadow-[0_7px_9px_0_rgba(0,0,0,0.02)]">
        <div className="text-xs px-3 py-2 border-b border-solid border-[#00FF00] font-mono font-semibold rounded-t-sm">
          <p className="font-mono text-white">{node_id00}</p>
        </div>
        <div className="p-2 bg-[#132137]">
          <button
            onClick={handleSubmit}
            className=" nodrag bg-[#FF85E4] w-full rounded-sm px-4 py-1 font-mono font-semibold text-xs hover:scale-105"
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default StartNodeProperties;
