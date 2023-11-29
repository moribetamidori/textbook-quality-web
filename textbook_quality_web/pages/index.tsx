import { useState, FormEvent } from "react";
import OverviewFlow from "./OverviewFlow";
interface IGenerateTopicsResponse {
  status: string;
  data: any;
}

export default function Home() {
  const [subject, setSubject] = useState<string>("");
  const [outFile, setOutFile] = useState<string>("");
  const [iterations, setIterations] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [responseData, setResponseData] = useState<any>(null); // Initialize the state

  console.log("responseData", responseData);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/generateTopics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        out_file: outFile,
        iterations,
      }),
    });

    const data: IGenerateTopicsResponse = await response.json();
    setStatus(data.status);
    setResponseData(data.data); // Set the state with the returned data

    // If the generation was successful, call the augmentTopics function
    if (data.status === "success") {
      handleAugmentTopics(outFile);
    }
  };

  const handleAugmentTopics = async (inFile: string) => {
    const response = await fetch("/api/augmentTopics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        in_file: inFile,
        out_file: "augmented_" + inFile, // You can modify this as needed
        domain: "python", // You can modify this as needed
      }),
    });

    const data: IGenerateTopicsResponse = await response.json();
    setStatus(data.status);
    setResponseData(data.data); // Set the state with the returned data
  };
  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#F3EEEB" }}
    >
      {" "}
      {/* ...existing code... */}
      <OverviewFlow />
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
        />
        <input
          type="text"
          value={outFile}
          onChange={(e) => setOutFile(e.target.value)}
          placeholder="Output File"
        />
        <input
          type="number"
          value={iterations}
          onChange={(e) => setIterations(Number(e.target.value))}
          placeholder="Iterations"
        />
        <button type="submit">Generate Topics</button>
      </form> */}
      {/* {status && <p>Status: {status}</p>} */}
      {/* {responseData && <p>Response: {JSON.stringify(responseData)}</p>} */}
    </div>
  );
}
