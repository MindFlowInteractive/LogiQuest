import { useState } from "react";
import GameplayModal from "../modals/GameplayModal";

export default function GamePlay() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Open Modal
      </button>

      <GameplayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
