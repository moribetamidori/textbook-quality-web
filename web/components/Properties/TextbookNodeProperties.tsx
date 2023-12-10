import { getStatusColorClass } from "@/util/status";
import { StatusContext } from "@/contexts/StatusContext";
import { useContext, useEffect, useState } from "react";
import { saveAs } from "file-saver";

interface IGenerateTopicsResponse {
  status: string;
  data: any;
}
function TextbookNodeProperties({ data }: any) {
  const {
    textbookStatus,
    setTextbookStatus,
    augmentStatus,
    augmentFile,
    maxCoursesPerBook,
    numTextbooks,
    setBooksFile,
    booksFile,
  } = useContext(StatusContext);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

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
      <div className="flex flex-col border border-solid border-black h-full rounded-sm  bg-gradient-to-r from-[#FF9A3D]/40 to-[#1D1D1D] shadow-[0_7px_9px_0_rgba(0,0,0,0.02)]">
        <div className="text-xs px-3 py-2 border-b border-solid border-[#00FF00] font-mono font-semibold rounded-t-sm">
          <p className="font-mono text-white">Step 3: Generate Textbook</p>
        </div>
        <div className="relative bg-[#17191A] p-1 flex flex-col text-xs text-white font-mono font-semibold rounded-b-sm">
          <div className="flex px-2 py-2 ">
            Status:{" "}
            <span
              className={`inline-block w-3 h-3 ml-2 mr-2 mt-0.5 rounded-full ${getStatusColorClass(
                textbookStatus
              )}`}
            ></span>{" "}
            {textbookStatus}
          </div>
          <div className="h-96 border border-[#292A2C] bg-[#010201] rounded-sm"></div>
          <div className="w-full">
            <button
              onClick={() => fileUrl && saveAs(fileUrl, `${booksFile}`)}
              disabled={!fileUrl}
              className={`w-full text-black my-2 mt-4 nodrag ${
                fileUrl
                  ? "bg-[#C2900F] hover:scale-105"
                  : "bg-gray-400 cursor-not-allowed"
              } rounded-sm px-4 py-1 font-mono font-semibold text-xs `}
            >
              Save Textbooks
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TextbookNodeProperties;
