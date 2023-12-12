import { useContext } from "react";
import GenerateNodeProperties from "./Properties/GenerateNodeProperties";
import TextbookNodeProperties from "./Properties/TextbookNodeProperties";
import { StatusContext } from "@/contexts/StatusContext";
import AugmentNodeProperties from "./Properties/AugmentNodeProperties";
import StartNodeProperties from "./Properties/StartNodeProperties";
import SubjectNodeProperties from "./Properties/SubjectNodeProperties";
import DownloadNodeProperties from "./Properties/DownloadNodeProperties";

interface SidebarProps {
  open: boolean;
  node: any | null;
  content: React.ReactNode | null;
  type: string;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  open,
  node,
  content,
  type,
  onClose,
}) => {
  const { numAugmentedAgents, setNumAugmentedAgents } =
    useContext(StatusContext);

  const renderContent = () => {
    switch (type) {
      case "generate":
        return (
          <GenerateNodeProperties
            numAugmentedAgents={numAugmentedAgents}
            setNumAugmentedAgents={setNumAugmentedAgents}
          />
        );
      case "augment":
        return <AugmentNodeProperties node={node} />;
      case "textbook":
        return <TextbookNodeProperties />;
      case "start":
        return <StartNodeProperties />;
      case "subject":
        return <SubjectNodeProperties />;
      case "download":
        return <DownloadNodeProperties />;
      default:
        return content;
    }
  };
  return (
    <div
      className={`fixed top-0 right-0 w-96 h-full bg-[#010201] border-l border-[#292A2C]  p-2 overflow-y-auto z-50 transform transition-all ease-in-out duration-300`}
    >
      <div className="fixed top-0 right-0 w-96 bg-[#010201] border-l border-[#292A2C]  p-4 z-50">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-xs font-bold">PROPERTIES</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-[#292A2C] rounded-md p-1"
          >
            <img className="h-4" src="/close.png" alt="close" />
          </button>
        </div>
      </div>
      <div className="pt-12 ">
        {/* <h2 className="text-white">{node.data.label}</h2> */}
        <div className="border border-[#292A2C] rounded-sm">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
