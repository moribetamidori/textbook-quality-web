import { useContext, useEffect, useState } from "react";
import { getStatusColorClass } from "@/util/status";
import { StatusContext } from "@/contexts/StatusContext";

interface IGenerateTopicsResponse {
  status: string;
  data: any;
}
interface AugmentNodePropertiesProps {
  node: any;
}
function AugmentNodeProperties({ node }: AugmentNodePropertiesProps) {
  const {
    augmentStatus,
    setAugmentStatus,
    generateStatus,
    outFile,
    setAugmentFile,
    maxAugmentedTopics,
    node_id02
  } = useContext(StatusContext);
  const [status, setStatus] = useState<string>("");
  const [responseData, setResponseData] = useState<any>(null); // Initialize the state
  const [color, setColor] = useState<string>(
    getStatusColorClass(augmentStatus)
  );
  useEffect(() => {
    setColor(getStatusColorClass(augmentStatus));
  }, [augmentStatus]);
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
      <div className="flex flex-col border border-solid border-black h-full rounded-sm  bg-gradient-to-r from-[#9F59FF]/40 to-[#1D1D1D] shadow-[0_7px_9px_0_rgba(0,0,0,0.02)]">
        <div className="text-xs px-3 py-2 border-b border-solid border-[#00FF00] font-mono font-semibold rounded-t-sm">
          <p className="font-mono text-white">
            {node_id02}
            {/* <button className="border px-2 rounded-xl">
              {" "}
              ID:{node.data.label}
            </button> */}
          </p>
        </div>
        <div className="relative bg-[#17191A] p-1 flex flex-col text-xs text-white font-mono font-semibold rounded-b-sm">
          <div className="flex px-2 py-2 ">
            Status:{" "}
            {color && (
              <span
                style={{ backgroundColor: color }}
                className={`inline-block w-3 h-3 ml-2 mr-2 mt-0.5 rounded-full }`}
              ></span>
            )}
            {augmentStatus}
          </div>
          <div className="h-96 border border-[#292A2C] bg-[#010201] rounded-sm"></div>
        </div>
      </div>
    </>
  );
}

export default AugmentNodeProperties;
