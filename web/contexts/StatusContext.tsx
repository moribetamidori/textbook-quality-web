import { createContext } from "react";
type StatusContextType = {
  generateStatus: string;
  setGenerateStatus: React.Dispatch<React.SetStateAction<string>>;
  augmentStatus: string;
  setAugmentStatus: React.Dispatch<React.SetStateAction<string>>;
  textbookStatus: string;
  setTextbookStatus: React.Dispatch<React.SetStateAction<string>>;
  outFile: string;
  setOutFile: React.Dispatch<React.SetStateAction<string>>;
};

export const StatusContext = createContext<StatusContextType>({
  generateStatus: "",
  augmentStatus: "",
  textbookStatus: "",
  setGenerateStatus: () => {},
  setAugmentStatus: () => {},
  setTextbookStatus: () => {},
  outFile: "",
  setOutFile: () => {},
});
