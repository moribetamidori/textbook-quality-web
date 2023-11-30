import { FormEvent, useContext, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import { statusColor } from "@/util/status";
import { StatusContext } from "@/contexts/StatusContext";

interface IGenerateTopicsResponse {
  status: string;
  data: any;
}

function GenerateNode({ data }: any) {
  const { generateStatus, setGenerateStatus, setOutFile } =
    useContext(StatusContext);

  const [subject, setSubject] = useState<string>("");
  const [iterations, setIterations] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [responseData, setResponseData] = useState<any>(null); // Initialize the state
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    setColor(statusColor(generateStatus));
  }, [generateStatus]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setGenerateStatus("pending");
    const currentOutFile = subject.replace(/\s/g, "_") + "_topics.json";

    const response = await fetch("/api/generateTopics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        out_file: currentOutFile,
        iterations,
      }),
    });

    const data: IGenerateTopicsResponse = await response.json();
    setStatus(data.status);
    setResponseData(data.data);
    if (data.status === "success") {
      setGenerateStatus("finished");
    } else {
      setGenerateStatus("failed");
    }
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSubject(value);
    const newOutFile = value.replace(/\s/g, "_") + "_topics.json";
    setOutFile(newOutFile);
    setIterations(10);
  }
  return (
    <>
      <div className="flex flex-col border border-solid border-gray-200 h-full rounded-2xl bg-white/70 shadow-[0_7px_9px_0_rgba(0,0,0,0.02)]">
        <div className="text-xs px-3 py-2 border-b border-solid border-gray-200 font-mono font-semibold rounded-t-2xl">
          Step 1: Generate Topics
        </div>
        <div className="relative bg-white p-3 flex flex-col rounded-b-2xl">
          {color && (
            <div className="relative bg-white p-3 flex text-xs text-gray-500 font-mono font-semibold rounded-b-2xl">
              Status:{" "}
              <span
                className={`inline-block w-3 h-3 ml-2 mr-2 mt-0.5 rounded-full bg-${color}-400`}
              ></span>{" "}
              {generateStatus}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              className="rounded-lg border border-black mr-2 nondrag"
              id="text"
              name="text"
              value={subject}
              onChange={handleInputChange}
            />
            <button className="nodrag bg-[#ff0071] rounded-lg px-4 font-mono font-semibold text-xs hover:scale-105">
              Generate
            </button>
          </form>
        </div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default GenerateNode;
