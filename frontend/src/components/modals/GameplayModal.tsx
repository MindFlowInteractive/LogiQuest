"use client";

import { useEffect, useRef } from "react";
import GameActionButton from "../GameActionButton";
import ModalGameIcon from "./ModalGameIcon";
import Fiftyicon from "/src/assets/Fiftyicon.svg";
import peopleicon from "/src/assets/peopleicon.svg";

interface GameplayModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  promptText?: string;
  GameScore?: number;
}

export default function GameplayModal({
  isOpen,
  onClose,
  promptText = "Do you want to continue?",
  title = "Congratulations!",
  GameScore = 4500,
}: GameplayModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([]); // Store button references
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
    } else {
      previousActiveElement.current?.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const focusableElements = buttonRefs.current.filter((el) => el !== null);
      const currentIndex = focusableElements.findIndex(
        (el) => el === document.activeElement
      );

      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % focusableElements.length;
        focusableElements[nextIndex]?.focus();
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        const prevIndex =
          (currentIndex - 1 + focusableElements.length) %
          focusableElements.length;
        focusableElements[prevIndex]?.focus();
      } else if (event.key === "Enter") {
        (document.activeElement as HTMLAnchorElement)?.click();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 flex items-center px-4 justify-center bg-[#1B171799] h-full z-50 
      transition-opacity duration-300 ease-in-out 
      ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className={`bg-[#01100F] rounded-[20px] w-full md:max-w-xl p-4 md:p-6 shadow-xl relative 
        transform transition-all duration-500 ease-in-out focus:outline-none
        ${
          isOpen
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-90 translate-y-10 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Title */}
        <h3 className="text-[#048179] text-xl md:text-4xl font-semibold text-center tracking-widest">
          {title}
        </h3>

        {/* GameScore and Icons */}
        <div className="flex flex-col md:gap-3 justify-center items-center md:mt-4">
          <img
            src="/src/assets/goldbag.svg"
            alt="Gold Bag"
            className="w-28 sm:w-32 md:w-52"
          />
          <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-t from-[#EE2B22] via-[#F9BC07] to-[#FDD405] text-transparent bg-clip-text">
            {GameScore}
          </h1>
          <div className="flex justify-center w-3/4 md:w-full gap-3">
            <ModalGameIcon number="12700" />
            <ModalGameIcon number="12000" icon={peopleicon} />
            <ModalGameIcon number="10000" icon={Fiftyicon} />
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex flex-col mt-4 gap-3">
          <p className="text-[#CFFDED] text-sm md:text-base text-center font-prompt">
            {promptText}
          </p>
          <div className="flex flex-col gap-2 justify-center items-center">
            <GameActionButton
              ref={(el) => {
                buttonRefs.current[0] = el;
              }}
              text="Next"
              href="/"
              borderColor="bg-[#F9BC07]"
              bgColor="bg-[#033330]"
            />
            <GameActionButton
              ref={(el) => {
                buttonRefs.current[1] = el;
              }}
              text="Replay"
              href="/"
              borderColor="bg-[#F9BC07]"
              bgColor="bg-[#000F33]"
            />
            <GameActionButton
              ref={(el) => {
                buttonRefs.current[2] = el;
              }}
              text="Exit"
              borderColor="bg-[#CFFDED]"
              bgColor="bg-[#01100F]"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
