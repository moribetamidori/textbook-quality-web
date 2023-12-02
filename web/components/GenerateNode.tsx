import { FormEvent, useContext, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import { getStatusColorClass } from "@/util/status";
import { StatusContext } from "@/contexts/StatusContext";

interface IGenerateTopicsResponse {
  status: string;
  data: any;
}

function GenerateNode({ data }: any) {
  const {
    generateStatus,
    setGenerateStatus,
    setOutFile,
    maxAugmentedTopics,
    maxCoursesPerBook,
    numTextbooks,
    setMaxAugmentedTopics,
    setMaxCoursesPerBook,
    setNumTextbooks,
    setMaxGeneratedTopics,
    maxGeneratedTopics,
  } = useContext(StatusContext);

  const statusColorClasses: { [key: string]: string } = {
    not_started: "bg-gray-400",
    pending: "bg-yellow-400",
    finished: "bg-green-400",
    failed: "bg-red-400",
  };

  const [subject, setSubject] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [responseData, setResponseData] = useState<any>(null); // Initialize the state

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
        iterations: maxGeneratedTopics,
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
  }
  return (
    <>
      <div className="flex flex-col border border-solid border-black h-full rounded-lg  bg-gradient-to-r from-[#00FF00]/40 to-[#1D1D1D] shadow-[0_7px_9px_0_rgba(0,0,0,0.02)]">
        <div className="text-xs px-3 py-2 border-b  border-solid border-[#00FF00] font-mono font-semibold rounded-t-lg text-white">
          Step 1: Generate Topics
        </div>
        <div className="relative bg-[#132137] p-3 flex flex-col rounded-b-lg">
          <div className="relative bg-[#132137] flex text-xs text-white font-mono font-semibold rounded-b-lg">
            Status:{" "}
            <span
              className={`inline-block w-3 h-3 ml-2 mr-2 mt-0.5 rounded-full ${getStatusColorClass(
                generateStatus
              )}`}
            ></span>
            {generateStatus}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mt-2 flex flex-col">
              <span className="text-xs font-mono font-semibold text-white">
                subject
              </span>
              <input
                className="rounded-lg font-mono text-md px-2 border border-black mr-2 nondrag bg-[#272B42] text-white"
                id="text"
                name="text"
                placeholder="Enter a subject"
                value={subject}
                onChange={handleInputChange}
              />
              <span className="text-xs mt-2 font-mono font-semibold  text-white">
                maxGeneratedTopics
              </span>
              <input
                className=" rounded-lg font-mono text-md px-2 border border-black mr-2 nondrag bg-[#272B42] text-white"
                id="maxGeneratedTopics"
                name="maxGeneratedTopics"
                value={maxGeneratedTopics}
                onChange={(e) =>
                  setMaxGeneratedTopics(
                    e.target.value ? parseInt(e.target.value) : 0
                  )
                }
              />
              <span className="text-xs mt-2 font-mono font-semibold  text-white">
                maxAugmentedTopics
              </span>
              <input
                className=" rounded-lg font-mono text-md px-2 border border-black mr-2 nondrag bg-[#272B42] text-white"
                id="maxAugmentedTopics"
                name="maxAugmentedTopics"
                value={maxAugmentedTopics}
                onChange={(e) =>
                  setMaxAugmentedTopics(
                    e.target.value ? parseInt(e.target.value) : 0
                  )
                }
              />
              <span className="text-xs mt-2 font-mono font-semibold  text-white">
                maxCoursesPerBook
              </span>
              <input
                className="rounded-lg font-mono text-md px-2 border border-black mr-2 nondrag bg-[#272B42] text-white"
                id="maxCoursesPerBook"
                name="maxCoursesPerBook"
                value={maxCoursesPerBook}
                onChange={(e) =>
                  setMaxCoursesPerBook(
                    e.target.value ? parseInt(e.target.value) : 0
                  )
                }
              />
              <span className="text-xs mt-2 font-mono font-semibold  text-white">
                numTextbooks
              </span>
              <input
                className="rounded-lg font-mono text-md px-2 border border-black mr-2 nondrag bg-[#272B42] text-white"
                id="numTextbooks"
                name="numTextbooks"
                value={numTextbooks}
                onChange={(e) =>
                  setNumTextbooks(e.target.value ? parseInt(e.target.value) : 0)
                }
              />
              <button className="mt-4 nodrag bg-[#00FF00] rounded-lg px-4 py-1 font-mono font-semibold text-xs hover:scale-105">
                Generate
              </button>
            </div>
          </form>
        </div>
      </div>
      <Handle
        style={{ width: "10px", height: "10px", backgroundColor: "#00FF00" }}
        type="target"
        position={Position.Left}
      />
      <Handle
        style={{ width: "10px", height: "10px", backgroundColor: "#00FF00" }}
        type="source"
        position={Position.Right}
      />
    </>
  );
}

export default GenerateNode;
