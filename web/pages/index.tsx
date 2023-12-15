import SearchNous from "@/components/Search/SearchNous";
import OverviewFlow from "../components/OverviewFlow";
import { useState } from "react";

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showSearch, setShowSearch] = useState<boolean>(true);
  const [selectedIcon, setSelectedIcon] = useState<string>("message");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
    setShowSearch(icon === "message");
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#010201",
        position: "relative",
      }}
    >
      <div
        className={`fixed top-0 left-0 w-20 h-full bg-[#010201] border-r border-[#292A2C]  p-2 overflow-y-auto z-50 transform transition-all ease-in-out duration-300`}
      >
        <div
          onClick={showModal}
          className=" z-10 border border-white cursor-pointer m-4 shadow-lg rounded-lg bg-black flex items-center justify-center font-mono"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "50px",
            height: "50px",
          }}
        >
          <img src="/synthia.png" className="w-12 h-12 rounded-lg" />
          {/* <p className="text-white">Nous</p> */}
        </div>
        <div className="mt-20 flex flex-col justify-between h-full">
          <div>
            <button disabled style={{ cursor: "not-allowed" }}>
              <img
                src="/icons/laptop.png"
                className="w-6 h-6 ml-5 rounded-lg opacity-60"
              />
            </button>
            <div className="border border-r border-gray-400 mt-5 opacity-20 "></div>
            <button
              className={`mt-5 ml-2 px-3 rounded-lg py-1 ${
                selectedIcon === "message" ? "bg-blue-500" : ""
              }`}
              onClick={() => handleIconClick("message")}
            >
              <img
                src="/icons/message.png"
                className="w-6 h-6 rounded-lg opacity-60"
              />
            </button>
            <button
              className={`mt-5 ml-2 px-3 rounded-lg py-1 ${
                selectedIcon === "robot" ? "bg-blue-500" : ""
              }`}
              onClick={() => handleIconClick("robot")}
            >
              <img
                src="/icons/robot.png"
                className="w-6 h-6 rounded-lg opacity-60"
              />
            </button>
            <button disabled style={{ cursor: "not-allowed" }}>
              <img
                src="/icons/code.png"
                className="mt-5 w-6 h-6 ml-5 rounded-lg opacity-60"
              />
            </button>
          </div>
          <div className="mb-24 mt-20">
            <button disabled style={{ cursor: "not-allowed" }}>
              <img
                src="/icons/download.png"
                className=" w-5 ml-5 rounded-lg opacity-60"
              />
            </button>
            <button disabled style={{ cursor: "not-allowed" }}>
              <img
                src="/icons/setting.png"
                className="mt-5 ml-5 w-5 rounded-lg opacity-60"
              />
            </button>
            <button disabled style={{ cursor: "not-allowed" }}>
              <img
                src="/icons/sun.png"
                className="mt-5 w-5 ml-5  rounded-lg opacity-60"
              />
            </button>
          </div>
        </div>
      </div>
      {/* {isModalVisible && <KeyInput closePopUp={handleCancel} />} */}

      {showSearch ? (
        <div className="pl-24">
          <SearchNous />
        </div>
      ) : (
        <OverviewFlow />
      )}
    </div>
  );
}
