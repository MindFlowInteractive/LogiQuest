"use client"
import { ChevronRight } from "lucide-react"

export type GameMode = {
  id: string
  name: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  estimatedTime: string
  skills: string[]
}

// Static game modes data
const gameModes: GameMode[] = [
  {
    id: "quiz",
    name: "Quiz Mode",
    description:
      "Test your knowledge with a series of multiple-choice questions across various categories...",
    difficulty: "Easy",
    estimatedTime: "10-15 minutes",
    skills: ["General Knowledge", "Quick Thinking", "Memory Recall"],
  },
  {
    id: "puzzle",
    name: "Puzzle Mode",
    description:
      "Solve complex puzzles that require logical thinking and problem-solving skills...",
    difficulty: "Medium",
    estimatedTime: "15-20 minutes",
    skills: ["Problem Solving", "Pattern Recognition", "Logical Reasoning"],
  },
  {
    id: "challenge",
    name: "Challenge Mode",
    description:
      "Face a series of increasingly difficult challenges that combine elements of quizzes and puzzles...",
    difficulty: "Hard",
    estimatedTime: "20-30 minutes",
    skills: ["Critical Thinking", "Time Management", "Adaptability"],
  },
  {
    id: "daily",
    name: "Daily Quest",
    description:
      "A new challenge every day! Complete the daily quest to earn special rewards and compete on the leaderboard.",
    difficulty: "Medium",
    estimatedTime: "5-10 minutes",
    skills: ["Consistency", "Versatility", "Competition"],
  },
];

interface GameModesListProps {
  onSelectMode: (mode: GameMode) => void
  selectedModeId: string | null
}

export default function GameModesList({
  onSelectMode,
  selectedModeId,
}: GameModesListProps) {
  return (
    <div className="w-full bg-[#1E1E1E] rounded-lg p-6">
      <h2 className="text-white text-xl font-bold mb-4">Game Modes</h2>
      <div className="space-y-3">
        {gameModes.map((mode) => (
          <div
            key={mode.id}
            onClick={() => onSelectMode(mode)}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
              selectedModeId === mode.id
                ? "bg-[#FFD700] text-black"
                : "bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
            }`}
          >
            <span className="font-medium">{mode.name}</span>
            <ChevronRight
              className={`h-5 w-5 ${
                selectedModeId === mode.id ? "text-black" : "text-[#FFD700]"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
