import { useCallback } from "react";
import { Handle, Position } from "reactflow";

function GenerateNode({ data }: any) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <div className="flex flex-col border border-solid border-gray-200 h-full rounded-2xl bg-white/70 shadow-[0_7px_9px_0_rgba(0,0,0,0.02)]">
        <div className="text-xs px-3 py-2 border-b border-solid border-gray-200 font-mono font-semibold rounded-t-2xl">
          Step 1: Generate Topics
        </div>
        <div className="relative bg-white p-3 flex rounded-b-2xl">
          <input
            className="rounded-lg border border-black mr-2 nondrag"
            id="text"
            name="text"
            onChange={onChange}
          />
          <button className="nodrag bg-[#ff0071] rounded-lg px-4 font-mono font-semibold text-xs hover:scale-105">
            Generate
          </button>
        </div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default GenerateNode;
