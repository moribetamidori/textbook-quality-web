import { getStatusColorClass } from "@/util/status";
import { StatusContext } from "@/contexts/StatusContext";
import { useContext, useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { Handle, Position } from "reactflow";

function DownloadNode({ data }: any) {
  const {
    booksFile,
    fileUrl,
    node_id04
  } = useContext(StatusContext);

  return (
    <>
      <div className="flex flex-col border border-solid border-black h-full rounded-lg  bg-gradient-to-r from-[#0FA795]/40 to-[#1D1D1D] shadow-[0_7px_9px_0_rgba(0,0,0,0.02)]">
        <div className="text-xs px-3 py-2 border-b border-solid border-[#00FF00] font-mono font-semibold rounded-t-lg">
          <p className="font-mono text-white">{node_id04}</p>
        </div>
        <div className="p-2 bg-[#132137]">
          <button
            onClick={() => fileUrl && saveAs(fileUrl, `${booksFile}`)}
            disabled={!fileUrl}
            className={`w-36 text-black  nodrag ${
              fileUrl
                ? "bg-[#8660F3] hover:scale-105"
                : "bg-gray-400 cursor-not-allowed"
            } rounded-sm px-4 py-1 font-mono font-semibold text-xs `}
          >
            Save Textbooks
          </button>
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

export default DownloadNode;
