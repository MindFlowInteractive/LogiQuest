"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Trophy, Calendar, BookOpen, Flag, Timer, Map, InfinityIcon, PuzzleIcon as PuzzlePiece } from "lucide-react";

// Internal `cn` function
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// Define game mode types
export type GameMode = {
  id: string;
  name: string;
  description: string[];
  icon: React.ReactNode;
};

// Game modes data based on the screenshot
const GAME_MODES: GameMode[] = [
  {
    id: "classic",
    name: "Classic Mode",
    description: [
      "Players answer a series of questions in a timed format. Each question has four options, and players must select the correct one",
    ],
    icon: <Trophy className="h-5 w-5" />,
  },
  {
    id: "daily-challenge",
    name: "Daily Challenge",
    description: ["Answer the questions correctly within the time limit", "Make your choice before time runs out."],
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    id: "practice",
    name: "Practice Mode",
    description: ["A non-competitive mode where players can practice without time limits."],
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    id: "challenge",
    name: "Challenge Mode",
    description: ["Players face a set number of questions (e.g., 10) with a limited time for each."],
    icon: <Flag className="h-5 w-5" />,
  },
  {
    id: "timed-blitz",
    name: "Timed Blitz",
    description: ["Players answer as many questions as possible within a fixed time (e.g., 3 minutes)."],
    icon: <Timer className="h-5 w-5" />,
  },
  {
    id: "adventure",
    name: "Adventure Mode",
    description: ["A storyline-driven mode where players progress through levels by answering questions"],
    icon: <Map className="h-5 w-5" />,
  },
  {
    id: "endless",
    name: "Endless Mode",
    description: ["A continuous stream of questions where players can keep answering until they get one wrong"],
    icon: <InfinityIcon className="h-5 w-5" />,
  },
  {
    id: "puzzle",
    name: "Puzzle Mode",
    description: ["Players solve logic puzzles or riddles instead of traditional questions."],
    icon: <PuzzlePiece className="h-5 w-5" />,
  },
]

type GameModeDropdownProps = {
  onSelectMode?: (mode: GameMode) => void
}

export function GameModeDropdown({ onSelectMode }: GameModeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null)
  const [animationState, setAnimationState] = useState<"closed" | "opening" | "open" | "closing">("closed")
  const [hoveredModeId, setHoveredModeId] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    if (isOpen) {
      setAnimationState("closing")
      setTimeout(() => {
        setIsOpen(false)
        setAnimationState("closed")
      }, 300) // Match this with the CSS transition duration
    } else {
      setIsOpen(true)
      setAnimationState("opening")
      setTimeout(() => {
        setAnimationState("open")
      }, 50) // Small delay to ensure the opening animation starts
    }
  }

  const handleSelectMode = (mode: GameMode) => {
    setSelectedMode(mode)
    if (onSelectMode) {
      onSelectMode(mode)
    }
    toggleDropdown()
  }

  const handleMouseEnter = (modeId: string) => {
    setHoveredModeId(modeId)
  }

  const handleMouseLeave = () => {
    setHoveredModeId(null)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) toggleDropdown()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Navigation item */}
      <button
        className={cn(
          "px-4 py-2 text-teal-300 hover:text-white focus:outline-none transition-all duration-200",
          "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-teal-400",
          "after:transition-all after:duration-300",
          isOpen ? "text-white after:w-full" : "after:w-0 hover:after:w-full",
        )}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Game Mode
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          className={cn(
            "fixed left-1/2 transform -translate-x-1/2 mt-2 w-[80vw] max-w-[1200px]",
            "bg-gradient-to-b from-teal-900 to-teal-950 rounded-lg shadow-xl z-50",
            "border border-teal-700/30 overflow-hidden transition-all duration-300",
            animationState === "opening" && "opacity-0 translate-y-[-10px]",
            animationState === "open" && "opacity-100 translate-y-0",
            animationState === "closing" && "opacity-0 translate-y-[-10px]",
          )}
          style={{
            top: `${dropdownRef.current?.getBoundingClientRect().bottom ?? 0}px`,
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4">
            {GAME_MODES.map((mode, index) => (
              <div
                key={mode.id}
                className={cn(
                  "bg-gradient-to-br from-teal-800 to-teal-900 rounded-lg p-4 cursor-pointer",
                  "transition-all duration-300 ease-in-out",
                  "border border-teal-600/20",
                  selectedMode?.id === mode.id && "ring-2 ring-teal-400",
                  // Staggered animation for each card
                  "opacity-0 translate-y-4",
                  animationState === "open" && "opacity-100 translate-y-0 transition-all",
                  // Hover and focus states
                  hoveredModeId === null
                    ? "hover:from-teal-700 hover:to-teal-800 hover:scale-105 hover:shadow-lg hover:z-10"
                    : hoveredModeId === mode.id
                      ? "from-teal-700 to-teal-800 scale-105 shadow-lg z-10 brightness-110"
                      : "opacity-50 filter blur-[1px] scale-95",
                )}
                style={{
                  transitionDelay: animationState === "open" ? `${index * 50}ms` : "0ms",
                }}
                onClick={() => handleSelectMode(mode)}
                onMouseEnter={() => handleMouseEnter(mode.id)}
                onMouseLeave={handleMouseLeave}
                onFocus={() => handleMouseEnter(mode.id)}
                onBlur={handleMouseLeave}
                tabIndex={0}
                role="button"
                aria-pressed={selectedMode?.id === mode.id}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleSelectMode(mode)
                  }
                }}
              >
                <div className="flex items-center mb-3">
                  <div className="p-1.5 bg-teal-600/30 rounded-md mr-2 text-teal-300">{mode.icon}</div>
                  <h3 className="text-white font-medium">{mode.name}</h3>
                </div>
                <ul className="text-teal-100 text-sm space-y-2">
                  {mode.description.map((item, index) => (
                    <li key={index} className="flex">
                      <span className="mr-2 text-teal-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


