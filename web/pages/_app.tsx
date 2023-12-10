import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StatusContext } from "@/contexts/StatusContext";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [generateStatus, setGenerateStatus] = useState("not_started");
  const [augmentStatus, setAugmentStatus] = useState("not_started");
  const [textbookStatus, setTextbookStatus] = useState("not_started");
  const [outFile, setOutFile] = useState("");
  const [augmentFile, setAugmentFile] = useState("");
  const [booksFile, setBooksFile] = useState("");
  const [maxAugmentedTopics, setMaxAugmentedTopics] = useState(0);
  const [maxCoursesPerBook, setMaxCoursesPerBook] = useState(0);
  const [numTextbooks, setNumTextbooks] = useState(0);
  const [maxGeneratedTopics, setMaxGeneratedTopics] = useState(0);
  const [numAugmentedAgents, setNumAugmentedAgents] = useState(1);

  return (
    <StatusContext.Provider
      value={{
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
      }}
    >
      <Component {...pageProps} />
    </StatusContext.Provider>
  );
}
