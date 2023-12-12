import { StatusContext } from "@/contexts/StatusContext";
import { useContext } from "react";

function SubjectNodeProperites({ data }: any) {
  const { subject, setSubject, node_idm1 } = useContext(StatusContext);
  return (
    <>
      <div className="flex flex-col border border-solid border-black h-full rounded-sm  bg-gradient-to-r from-[#5174ED]/40 to-[#1D1D1D] shadow-[0_7px_9px_0_rgba(0,0,0,0.02)]">
        <div className="text-xs px-3 py-2 border-b border-solid border-[#00FF00] font-mono font-semibold rounded-t-sm">
          <p className="font-mono text-white">{node_idm1}</p>
        </div>
        <div className="p-2 bg-[#132137]">
          <input
            className="w-full rounded-sm font-mono text-md px-2 border border-black mr-2 nondrag bg-[#010201] text-white"
            id="text"
            name="text"
            placeholder="Enter a topic"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default SubjectNodeProperites;
