import React, { useState, ChangeEvent, FormEvent } from "react";

const SearchNous: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  console.log("message", message);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: message, count: 2 }),
    });

    if (response.ok) {
      if (response.body) {
        const reader = response.body.getReader();
        let chunks = "";
        reader
          .read()
          .then(function processText({ done, value }): Promise<void> | void {
            if (done) {
              setAnswer(chunks);
              return;
            }
            chunks += new TextDecoder("utf-8").decode(value);
            setAnswer(chunks);
            return reader.read().then(processText);
          });
      } else {
        setAnswer("Failed to get documents.");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex flex-col ">
      <div className="mt-3 h-[500px] w-[720px] mx-auto ">
        <form onSubmit={handleSubmit} className="flex mt-4 items-center">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            className="px-4 py-2 mb-2 border text-white w-2/3 border-[#292A2C] rounded-md focus:outline-none focus:ring-2 bg-[#17191A] focus:ring-blue-600"
            placeholder="Search a topic..."
          />
          <button
            type="submit"
            className="px-4 w-1/3 py-2 ml-2 mb-2 text-white bg-gradient-to-r from-[#9F59FF]/40 to-[#1D1D1D] rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Ask Synthia
          </button>
        </form>
        <div className="min-h-[400px] h-auto border border-[#292A2C] bg-[#010201] rounded-sm text-white overflow-auto">
          {answer && <p className="p-4">{answer}</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchNous;
