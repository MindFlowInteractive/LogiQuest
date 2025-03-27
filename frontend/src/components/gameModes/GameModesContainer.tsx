"use client"
import { useState } from "react"
import GameModesList, { GameMode } from "./GameModesList"
import GameModeDescription from "./GameModeDescription"

export default function GameModesContainer() {
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null)

  const handleSelectMode = (mode: GameMode) => {
    setSelectedMode(mode)
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
        Choose Your Game Mode
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Game Modes List */}
        <div className="md:col-span-1">
          <GameModesList
            onSelectMode={handleSelectMode}
            selectedModeId={selectedMode?.id || null}
          />
        </div>
        {/* Right Column: Game Mode Description */}
        <div className="md:col-span-2">
          <GameModeDescription selectedMode={selectedMode} />
        </div>
      </div>
    </div>
  )
}
