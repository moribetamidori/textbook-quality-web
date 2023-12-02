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
  augmentFile: string;
  setAugmentFile: React.Dispatch<React.SetStateAction<string>>;
  booksFile: string;
  setBooksFile: React.Dispatch<React.SetStateAction<string>>;
  maxAugmentedTopics: number;
  setMaxAugmentedTopics: React.Dispatch<React.SetStateAction<number>>;
  maxCoursesPerBook: number;
  setMaxCoursesPerBook: React.Dispatch<React.SetStateAction<number>>;
  numTextbooks: number;
  setNumTextbooks: React.Dispatch<React.SetStateAction<number>>;
  maxGeneratedTopics: number;
  setMaxGeneratedTopics: React.Dispatch<React.SetStateAction<number>>;
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
  augmentFile: "",
  setAugmentFile: () => {},
  booksFile: "",
  setBooksFile: () => {},
  maxAugmentedTopics: 0,
  setMaxAugmentedTopics: () => {},
  maxCoursesPerBook: 0,
  setMaxCoursesPerBook: () => {},
  numTextbooks: 0,
  setNumTextbooks: () => {},
  maxGeneratedTopics: 0,
  setMaxGeneratedTopics: () => {},
});
