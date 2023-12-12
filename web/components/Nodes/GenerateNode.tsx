import { useContext, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import { getStatusColorClass } from "@/util/status";
import { StatusContext } from "@/contexts/StatusContext";

function GenerateNode({ data }: any) {
  const { generateStatus, node_id01 } = useContext(StatusContext);
  const [color, setColor] = useState<string>(
    getStatusColorClass(generateStatus)
  );
  useEffect(() => {
    setColor(getStatusColorClass(generateStatus));
  }, [generateStatus]);
  return (
    <>
      <div className="flex flex-col border border-solid border-black h-full rounded-lg  bg-gradient-to-r from-[#00FF00]/40 to-[#1D1D1D] shadow-[0_7px_9px_0_rgba(0,0,0,0.02)]">
        <div className="text-xs px-3 py-2 border-b  border-solid border-[#00FF00] font-mono font-semibold rounded-t-lg text-white">
          {node_id01}
        </div>
        <div className="relative bg-[#132137] p-3 flex flex-col rounded-b-lg">
          <div className="relative bg-[#132137] flex text-xs text-white font-mono font-semibold rounded-b-lg">
            Status:{" "}
            {color && (
              <span
                style={{ backgroundColor: color }}
                className={`inline-block w-3 h-3 ml-2 mr-2 mt-0.5 rounded-full }`}
              ></span>
            )}
            {generateStatus}
          </div>
          <div className="h-14 mt-2 border border-[#292A2C] bg-[#010201] rounded-sm"></div>

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
