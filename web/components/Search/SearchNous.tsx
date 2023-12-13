import React, { useState, ChangeEvent, FormEvent } from "react";

const SearchNous: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setAnswer(message);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="mt-3 flex items-start justify-center">
        <form onSubmit={handleSubmit} className="flex mt-4 items-center">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            className="px-4 py-2 mb-2 border w-[600px] border-[#292A2C] rounded-md focus:outline-none focus:ring-2 bg-[#17191A] focus:ring-blue-600"
            placeholder="Search a topic..."
          />
          <button
            type="submit"
            className="px-4 py-2 ml-2 mb-2 text-white bg-gradient-to-r from-[#9F59FF]/40 to-[#1D1D1D] rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Ask Synthia
          </button>
        </form>
      </div>
      <div className="h-[500px] w-[720px] mx-auto border border-[#292A2C] bg-[#010201] rounded-sm text-white overflow-auto">
        {answer && <p className="p-4">{answer}</p>}
      </div>
    </div>
  );
};

export default SearchNous;
