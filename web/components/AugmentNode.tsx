import { useContext, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import { getStatusColorClass } from "@/util/status";
import { StatusContext } from "@/contexts/StatusContext";

interface IGenerateTopicsResponse {
  status: string;
  data: any;
}
function AugmentNode({ data }: any) {
  const {
    augmentStatus,
    setAugmentStatus,
    generateStatus,
    outFile,
    setAugmentFile,
    maxAugmentedTopics,
  } = useContext(StatusContext);
  const [status, setStatus] = useState<string>("");
  const [responseData, setResponseData] = useState<any>(null); // Initialize the state

  const handleAugmentTopics = async (inFile: string) => {
    setAugmentStatus("pending");
    const augmentedFile = "augmented_" + inFile;
    setAugmentFile(augmentedFile);
    const response = await fetch("/api/augmentTopics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        in_file: inFile,
        out_file: augmentedFile,
        max: maxAugmentedTopics,
      }),
    });

    const data: IGenerateTopicsResponse = await response.json();
    setStatus(data.status);
    console.log(data.status);
    setResponseData(data.data);
    if (data.status === "success") {
      setAugmentStatus("finished");
    } else {
      setAugmentStatus("failed");
    }
  };

  useEffect(() => {
    if (generateStatus === "finished") {
      handleAugmentTopics(outFile);
    }
  }, [generateStatus]);
  return (
    <>
      <div className="flex flex-col border border-solid border-black h-full rounded-lg  bg-gradient-to-r from-[#9F59FF]/40 to-[#1D1D1D] shadow-[0_7px_9px_0_rgba(0,0,0,0.02)]">
        <div className="text-xs px-3 py-2 border-b border-solid border-[#00FF00] font-mono font-semibold rounded-t-lg">
          <p className="font-mono text-white">Step 2: Augment Topics</p>
        </div>
        <div className="relative bg-[#132137] p-3 flex text-xs text-white font-mono font-semibold rounded-b-lg">
          Status:{" "}
          <span
            className={`inline-block w-3 h-3 ml-2 mr-2 mt-0.5 rounded-full ${getStatusColorClass(
              augmentStatus
            )}`}
          ></span>{" "}
          {augmentStatus}
        </div>
      </div>
      <Handle
        style={{ width: "10px", height: "10px", backgroundColor: "#6C00FF" }}
        type="target"
        position={Position.Left}
      />
      <Handle
        style={{ width: "10px", height: "10px", backgroundColor: "#6C00FF" }}
        type="source"
        position={Position.Right}
      />
    </>
  );
}

export default AugmentNode;
