import { createContext, useState } from "react";
interface IGenerateTopicsResponse {
  status: string;
  data: any;
}
type StatusContextType = {
  subject: string;
  setSubject: React.Dispatch<React.SetStateAction<string>>;
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
  numAugmentedAgents: number;
  setNumAugmentedAgents: React.Dispatch<React.SetStateAction<number>>;
  handleSubmit: () => Promise<void>;
  fileUrl: string;
  setFileUrl: React.Dispatch<React.SetStateAction<string>>;
  node_idm1: string;
  node_id00: string;
  node_id01: string;
  node_id02: string;
  node_id03: string;
  node_id04: string;
};

export const StatusContext = createContext<StatusContextType>({
  subject: "",
  setSubject: () => {},
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
  numAugmentedAgents: 0,
  setNumAugmentedAgents: () => {},
  handleSubmit: async () => {},
  fileUrl: "",
  setFileUrl: () => {},
  node_idm1: "",
  node_id00: "",
  node_id01: "",
  node_id02: "",
  node_id03: "",
  node_id04: "",
});

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [subject, setSubject] = useState<string>("");
  const [generateStatus, setGenerateStatus] = useState<string>("not_started");
  const [augmentStatus, setAugmentStatus] = useState<string>("not_started");
  const [textbookStatus, setTextbookStatus] = useState<string>("not_started");
  const [outFile, setOutFile] = useState<string>("");
  const [augmentFile, setAugmentFile] = useState<string>("");
  const [booksFile, setBooksFile] = useState<string>("");
  const [maxAugmentedTopics, setMaxAugmentedTopics] = useState<number>(1);
  const [maxCoursesPerBook, setMaxCoursesPerBook] = useState<number>(1);
  const [numTextbooks, setNumTextbooks] = useState<number>(1);
  const [maxGeneratedTopics, setMaxGeneratedTopics] = useState<number>(1);
  const [numAugmentedAgents, setNumAugmentedAgents] = useState<number>(1);
  const [fileUrl, setFileUrl] = useState<string>("");

  const handleSubmit = async (): Promise<void> => {
    setGenerateStatus("pending");
    const currentOutFile = subject.replace(/\s/g, "_") + "_topics.json";
    setOutFile(currentOutFile);

    const response = await fetch("/api/generateTopics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        out_file: currentOutFile,
        iterations: maxGeneratedTopics,
      }),
    });

    const data: IGenerateTopicsResponse = await response.json();
    if (data.status === "success") {
      setGenerateStatus("finished");
    } else {
      setGenerateStatus("failed");
    }
  };

  return (
    <StatusContext.Provider
      value={{
        subject,
        setSubject,
        generateStatus,
        setGenerateStatus,
        augmentStatus,
        setAugmentStatus,
        textbookStatus,
        setTextbookStatus,
        outFile,
        setOutFile,
        augmentFile,
        setAugmentFile,
        booksFile,
        setBooksFile,
        maxAugmentedTopics,
        setMaxAugmentedTopics,
        maxCoursesPerBook,
        setMaxCoursesPerBook,
        numTextbooks,
        setNumTextbooks,
        maxGeneratedTopics,
        setMaxGeneratedTopics,
        numAugmentedAgents,
        setNumAugmentedAgents,
        handleSubmit,
        fileUrl,
        setFileUrl,
        node_idm1: "Topic",
        node_id00: "Start",
        node_id01: "Retrieve Paragraphs",
        node_id02: "Generate QA",
        node_id03: "Filter Output",
        node_id04: "Download",
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};
