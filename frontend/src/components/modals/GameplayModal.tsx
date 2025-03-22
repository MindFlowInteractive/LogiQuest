import { useEffect } from "react";
import GameButton from "../GameButton";
import ModalLogo from "./ModalLogo";

interface GameplayModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  score?: number;
}

export default function GameplayModal({
  isOpen,
  onClose,
  title = "Congratulation!",
  score = 4500,
}: GameplayModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#1B171799] backdrop-blur-sm z-50 p-4"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-[#01100F] rounded-[20px] w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-[#048179] text-2xl md:text-3xl font-medium text-center tracking-widest">
          {title}
        </h3>

        {/* Score & Images */}
        <div className="flex flex-col gap-4 justify-center items-center">
          <img
            src="/src/assets/goldbag.svg"
            alt="Gold Bag"
            className="w-40 md:w-52"
          />
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-t from-[#EE2B22] via-[#F9BC07] to-[#FDD405] text-transparent bg-clip-text">
            {score}
          </h1>
          <div className="flex justify-center gap-2">
            <ModalLogo />
            <ModalLogo />
            <ModalLogo />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col mt-4 gap-3">
          <p className="text-[#CFFDED] text-base text-center font-prompt">
            Do you want to continue?
          </p>
          <div className="flex flex-col gap-2 justify-center items-center">
            <GameButton
              text="Next"
              href="/"
              borderColor="bg-[#F9BC07]"
              bgColor="bg-[#033330]"
            />
            <GameButton
              text="Replay"
              href="/"
              borderColor="bg-[#F9BC07]"
              bgColor="bg-[#000F33]"
            />
            <GameButton
              text="Exit"
              href="/"
              borderColor="bg-[#CFFDED]"
              bgColor="bg-[#01100F]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
