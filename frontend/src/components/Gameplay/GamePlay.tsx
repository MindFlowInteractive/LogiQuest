import { useState } from "react";
import GameplayModal from "../modals/GameplayModal";

export default function GamePlay() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* button to test the game modal, can be removed once the gameplay component is built */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-[#01100F] text-white rounded-md"
      >
        Open game modal
      </button>

      <GameplayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
