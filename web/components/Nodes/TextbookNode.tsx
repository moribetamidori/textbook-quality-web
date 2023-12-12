import { Handle } from "reactflow";
import { Position } from "reactflow";
import { getStatusColorClass } from "@/util/status";
import { StatusContext } from "@/contexts/StatusContext";
import { useContext, useEffect, useState } from "react";
import { saveAs } from "file-saver";

interface IGenerateTopicsResponse {
  status: string;
  data: any;
}
function TextbookNode({ data }: any) {
  const {
    textbookStatus,
    setTextbookStatus,
    augmentStatus,
    augmentFile,
    maxCoursesPerBook,
    numTextbooks,
    setBooksFile,
    booksFile,
    node_id03,
  } = useContext(StatusContext);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [color, setColor] = useState<string>(
    getStatusColorClass(textbookStatus)
  );
  useEffect(() => {
    setColor(getStatusColorClass(textbookStatus));
  }, [textbookStatus]);
  useEffect(() => {
    if (augmentStatus === "finished") {
      handleGenerateBooks(augmentFile);
    }
  }, [augmentStatus]);

  const handleGenerateBooks = async (inFile: string) => {
    setTextbookStatus("pending");
    const textBookFile = "textbook_" + inFile + "l";
    setBooksFile(textBookFile);
    const response = await fetch("/api/generateBooks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topics_file: inFile,
        books_file: textBookFile,
        workers: numTextbooks,
        max: maxCoursesPerBook,
      }),
    });

    const data: IGenerateTopicsResponse = await response.json();
    if (data.status === "success") {
      setTextbookStatus("finished");
      const blob = new Blob([JSON.stringify(data.data)], {
        type: "application/json",
      });
      setFileUrl(URL.createObjectURL(blob));
    } else {
      setTextbookStatus("failed");
    }
  };

  return (
    <>
      <div className="flex flex-col border border-solid border-black h-full rounded-lg  bg-gradient-to-r from-[#FF9A3D]/40 to-[#1D1D1D] shadow-[0_7px_9px_0_rgba(0,0,0,0.02)]">
        <div className="text-xs px-3 py-2 border-b border-solid border-[#00FF00] font-mono font-semibold rounded-t-lg">
          <p className="font-mono text-white">{node_id03}</p>
        </div>
        <div className="flex flex-col relative bg-[#132137] p-3 flex text-xs text-white font-mono font-semibold rounded-b-lg">
          <div className="flex">
            Status:{" "}
            {color && (
              <span
                style={{ backgroundColor: color }}
                className={`inline-block w-3 h-3 ml-2 mr-2 mt-0.5 rounded-full }`}
              ></span>
            )}
            {textbookStatus}
          </div>
          <div className="h-14 mt-2 border border-[#292A2C] bg-[#010201] rounded-sm"></div>

          <div className="w-full">
            {fileUrl && (
              <button
                onClick={() => saveAs(fileUrl, `${booksFile}`)}
                className="w-full text-black my-2 mt-4 nodrag bg-[#00FF00] rounded-lg px-4 py-1 font-mono font-semibold text-xs hover:scale-105"
              >
                Save Textbooks
              </button>
            )}
          </div>
        </div>
      </div>
      <Handle
        style={{ width: "10px", height: "10px", backgroundColor: "#FF9A3D" }}
        type="target"
        position={Position.Left}
      />
      <Handle
        style={{ width: "10px", height: "10px", backgroundColor: "#FF9A3D" }}
        type="source"
        position={Position.Right}
      />
    </>
  );
}

export default TextbookNode;
