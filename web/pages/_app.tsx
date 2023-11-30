import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StatusContext } from "@/contexts/StatusContext";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [generateStatus, setGenerateStatus] = useState("not_started");
  const [augmentStatus, setAugmentStatus] = useState("not_started");
  const [textbookStatus, setTextbookStatus] = useState("not_started");
  const [outFile, setOutFile] = useState("");
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
      }}
    >
      <Component {...pageProps} />
    </StatusContext.Provider>
  );
}
