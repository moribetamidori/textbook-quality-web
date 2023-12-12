import { useContext, useEffect, useState } from "react";
import { getStatusColorClass } from "@/util/status";
import { StatusContext } from "@/contexts/StatusContext";

interface GenerateNodePropertiesProps {
  numAugmentedAgents: number;
  setNumAugmentedAgents: (value: number) => void;
}
function GenerateNodeProperties({
  numAugmentedAgents,
  setNumAugmentedAgents,
}: GenerateNodePropertiesProps) {
  const {
    generateStatus,
    maxAugmentedTopics,
    maxCoursesPerBook,
    numTextbooks,
    setMaxAugmentedTopics,
    setMaxCoursesPerBook,
    setNumTextbooks,
    setMaxGeneratedTopics,
    maxGeneratedTopics,
    node_id01
  } = useContext(StatusContext);

  const [subject, setSubject] = useState<string>("");
  const [color, setColor] = useState<string>(
    getStatusColorClass(generateStatus)
  );
  useEffect(() => {
    setColor(getStatusColorClass(generateStatus));
  }, [generateStatus]);
  // const handleStop = async () => {
  //   const response = await fetch("/api/stopProcess", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ processName: "topic_generator.py" }), // replace with the process you want to stop
  //   });

  //   const data = await response.json();
  //   if (data.status === "success") {
  //     alert("The process has been stopped.");
  //   } else {
  //     alert("Failed to stop the process.");
  //   }
  // };

  return (
    <>
      <div className=" flex flex-col border border-solid border-black h-full rounded-sm  bg-gradient-to-r from-[#00FF00]/40 to-[#1D1D1D] shadow-[0_7px_9px_0_rgba(0,0,0,0.02)]">
        <div className="text-xs px-3 py-2 border-b  border-solid border-[#00FF00] font-mono font-semibold rounded-t-sm text-white">
          {node_id01}
        </div>
        {/* <button
          onClick={handleStop}
          className="mt-4 nodrag bg-red-500 rounded-sm px-4 py-1 font-mono font-semibold text-xs hover:scale-105"
        >
          Stop
        </button> */}
        <div className="relative bg-[#17191A] p-3 flex flex-col rounded-b-sm">
          <div className="relative  flex text-xs text-white font-mono font-semibold rounded-b-sm">
            Status:{" "}
            {color && (
              <span
                style={{ backgroundColor: color }}
                className={`inline-block w-3 h-3 ml-2 mr-2 mt-0.5 rounded-full }`}
              ></span>
            )}
            {generateStatus}
          </div>

          <div className="mt-2 flex flex-col">
            <span className="text-xs mt-2 font-mono font-semibold  text-white">
              maxGeneratedTopics
            </span>
            <input
              className=" rounded-sm font-mono text-md px-2 border border-black mr-2 nondrag bg-[#010201] text-white"
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
              className=" rounded-sm font-mono text-md px-2 border border-black mr-2 nondrag bg-[#010201] text-white"
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
              numAugmentedAgents
            </span>
            <input
              className=" rounded-sm font-mono text-md px-2 border border-black mr-2 nondrag bg-[#010201] text-white"
              id="numAugmentedAgents"
              name="numAugmentedAgents"
              value={numAugmentedAgents}
              onChange={(e) =>
                setNumAugmentedAgents(
                  e.target.value ? parseInt(e.target.value) : 0
                )
              }
            />
            <span className="text-xs mt-2 font-mono font-semibold  text-white">
              maxCoursesPerBook
            </span>
            <input
              className="rounded-sm font-mono text-md px-2 border border-black mr-2 nondrag bg-[#010201] text-white"
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
              className="rounded-sm font-mono text-md px-2 border border-black mr-2 nondrag bg-[#010201] text-white"
              id="numTextbooks"
              name="numTextbooks"
              value={numTextbooks}
              onChange={(e) =>
                setNumTextbooks(e.target.value ? parseInt(e.target.value) : 0)
              }
            />
          </div>

          {/* <div className="text-white">
            <h1>Streamed Data:</h1>
            {streamedData.map((data, index) => (
              <pre key={index}>{JSON.stringify(data, null, 2)}</pre>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default GenerateNodeProperties;
