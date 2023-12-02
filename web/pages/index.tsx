import OverviewFlow from "../components/OverviewFlow";
import { useState } from "react";
import KeyInput from "@/components/KeyInput";
export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
        onClick={showModal}
        className="z-10 border border-white cursor-pointer m-4 shadow-lg rounded-lg bg-black flex items-center justify-center font-mono"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50px",
          height: "50px",
        }}
      >
        <p className="text-white">Nous</p>
      </div>
      {/* {isModalVisible && <KeyInput closePopUp={handleCancel} />} */}
      <OverviewFlow />
    </div>
  );
}