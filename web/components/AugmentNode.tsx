import { useContext, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import { statusColor } from "@/util/status";
import { StatusContext } from "@/contexts/StatusContext";

interface IGenerateTopicsResponse {
  status: string;
  data: any;
}
function AugmentNode({ data }: any) {
  const { augmentStatus, setAugmentStatus, generateStatus, outFile } =
    useContext(StatusContext);
  const [status, setStatus] = useState<string>("");
  const [responseData, setResponseData] = useState<any>(null); // Initialize the state

  const handleAugmentTopics = async (inFile: string) => {
    setAugmentStatus("pending");
    const response = await fetch("/api/augmentTopics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        in_file: inFile,
        out_file: "augmented_" + inFile,
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
      <div className="flex flex-col border border-solid border-gray-200 h-full rounded-2xl bg-white/70 shadow-[0_7px_9px_0_rgba(0,0,0,0.02)]">
        <div className="text-xs px-3 py-2 border-b border-solid border-gray-200 font-mono font-semibold rounded-t-2xl">
          <p className="font-mono">Step 2: Augment Topics</p>
        </div>
        <div className="relative bg-white p-3 flex text-xs text-gray-500 font-mono font-semibold rounded-b-2xl">
          Status:{" "}
          <span
            className={`inline-block w-3 h-3 ml-2 mr-2 mt-0.5 rounded-full bg-${statusColor(
              augmentStatus
            )}-400`}
          ></span>{" "}
          {augmentStatus}
        </div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default AugmentNode;
