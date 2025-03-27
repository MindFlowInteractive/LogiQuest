import { Clock, Award, BarChart } from "lucide-react"
import type { GameMode } from "./GameModesList"

interface GameModeDescriptionProps {
  selectedMode: GameMode | null
}

export default function GameModeDescription({
  selectedMode,
}: GameModeDescriptionProps) {
  if (!selectedMode) {
    return (
      <div className="w-full bg-[#1E1E1E] rounded-lg p-6 h-full flex items-center justify-center">
        <p className="text-gray-400 text-center">Select a game mode to view details</p>
      </div>
    )
  }

  // Map difficulty to color for demonstration
  const difficultyColor = {
    Easy: "text-green-500",
    Medium: "text-yellow-500",
    Hard: "text-red-500",
  }

  return (
    <div className="w-full bg-[#1E1E1E] rounded-lg p-6 h-full">
      <h2 className="text-white text-xl font-bold mb-4">{selectedMode.name}</h2>
      <p className="text-gray-300 mb-6">{selectedMode.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-[#FFD700]" />
          <div>
            <p className="text-gray-400 text-sm">Difficulty</p>
            <p className={`font-medium ${difficultyColor[selectedMode.difficulty]}`}>
              {selectedMode.difficulty}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#FFD700]" />
          <div>
            <p className="text-gray-400 text-sm">Estimated Time</p>
            <p className="text-white font-medium">{selectedMode.estimatedTime}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-[#FFD700]" />
          <div>
            <p className="text-gray-400 text-sm">XP Reward</p>
            <p className="text-white font-medium">100-300 XP</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-white font-semibold mb-2">Skills Developed</h3>
        <div className="flex flex-wrap gap-2">
          {selectedMode.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-[#2A2A2A] text-white px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <button className="mt-8 w-full bg-[#FFD700] hover:bg-[#E6C200] text-black font-semibold py-3 rounded-lg transition-colors">
        Start Game
      </button>
    </div>
  )
}
