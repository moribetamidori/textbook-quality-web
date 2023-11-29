// textbook_quality_web/pages/AugmentNode.tsx
import { useCallback } from "react";
import { Handle, Position } from "reactflow";

function TextbookNode({ data }: any) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  const statusColor = () => {
    switch (data.status) {
      case "not started":
        return "gray";
      case "pending":
        return "yellow";
      case "finished":
        return "green";
      case "failed":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <>
      <div className="flex flex-col border border-solid border-gray-200 h-full rounded-2xl bg-white/70 shadow-[0_7px_9px_0_rgba(0,0,0,0.02)]">
        <div className="text-xs px-3 py-2 border-b border-solid border-gray-200 font-mono font-semibold rounded-t-2xl">
          <p className="font-mono">Step 3: Generate Textbook</p>
        </div>
        <div className="relative bg-white p-3 flex text-xs text-gray-500 font-mono font-semibold rounded-b-2xl">
          Status:{" "}
          <span
            className={`inline-block w-3 h-3 ml-2 mr-2 mt-0.5 rounded-full bg-${statusColor()}-400`}
          ></span>{" "}
          {data.status || "not started"}
        </div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default TextbookNode;
