import React, { useState, ChangeEvent, FC, useEffect } from "react";
interface KeyInputProps {
  closePopUp: () => void;
}
const KeyInput: FC<KeyInputProps> = ({ closePopUp }) => {
  const [openAIKey, setOpenAIKey] = useState<string>("");
  const [serplyKey, setSerplyKey] = useState<string>("");
  useEffect(() => {
    const fetchKeys = async () => {
      const response = await fetch("/api/getKeys");
      if (response.ok) {
        const data = await response.json();
        setOpenAIKey(data.OPENAI_KEY|| "");
        setSerplyKey(data.SERPLY_KEY || "");
      }
    };
    fetchKeys();
  }, []);
  const handleSetKeys = async () => {
    const response = await fetch("/api/setKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        openAIKey,
        serplyKey,
      }),
    });

    if (response.ok) {
      console.log("Keys set");
      closePopUp();
    } else {
      console.log("Keys not set");
    }
  };
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="flex flex-col border border-black w-1/2"
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <p className="font-mono font-semibold">Set Keys</p>
        <input
          className="border border-black border-2 rounded-lg p-2"
          value={openAIKey}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setOpenAIKey(e.target.value)
          }
          placeholder="Enter OpenAI Key"
        />
        <input
          className="mt-2 border border-black border-2 rounded-lg p-2"
          value={serplyKey}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSerplyKey(e.target.value)
          }
          placeholder="Enter Serply Key"
        />
        <div className="mt-2">
          <button
            className="border border-black border-2 px-4 rounded-lg"
            onClick={closePopUp}
          >
            Cancel
          </button>
          <button
            className="ml-2 border border-black border-2 px-4 rounded-lg bg-black text-white hover:scale-105"
            onClick={handleSetKeys}
          >
            Set Keys
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyInput;
