"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"

// Styled components with animation capabilities
const HexagonButton = styled(motion.button)`
  clip-path: polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`

const TimerCircle = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  position: relative;
`

// Define types for our game state
type LevelStatus = "locked" | "unlocked" | "current" | "completed"

interface Level {
  number: number
  reward: number
  status: LevelStatus
}

interface Question {
  text: string
  options: {
    id: string
    text: string
    isCorrect: boolean
  }[]
  timeLimit: number
}

export default function Gameplay() {
  const [currentLevel, setCurrentLevel] = useState<number>(5)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState<number>(30 * 60 - 1) // 29:59 in seconds
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)
  const [showFeedback, setShowFeedback] = useState<boolean>(false)
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false)

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Page load animation trigger
  useEffect(() => {
    setIsPageLoaded(true)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes} : ${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const levels: Level[] = [
    { number: 15, reward: 10000, status: "locked" as LevelStatus },
    { number: 14, reward: 9000, status: "locked" as LevelStatus },
    { number: 13, reward: 8000, status: "locked" as LevelStatus },
    { number: 12, reward: 7000, status: "locked" as LevelStatus },
    { number: 11, reward: 6000, status: "locked" as LevelStatus },
    { number: 10, reward: 5000, status: (currentLevel === 10 ? "current" : "locked") as LevelStatus },
    { number: 9, reward: 4500, status: "locked" as LevelStatus },
    { number: 8, reward: 4000, status: "locked" as LevelStatus },
    { number: 7, reward: 3500, status: "locked" as LevelStatus },
    { number: 6, reward: 3000, status: "locked" as LevelStatus },
    { number: 5, reward: 2500, status: (currentLevel === 5 ? "current" : "unlocked") as LevelStatus },
    { number: 4, reward: 2000, status: "completed" as LevelStatus },
    { number: 3, reward: 1500, status: "completed" as LevelStatus },
    { number: 2, reward: 1000, status: "completed" as LevelStatus },
    { number: 1, reward: 500, status: "completed" as LevelStatus },
  ].reverse()

  const currentQuestion: Question = {
    text: "What is the primary purpose of formative assessment?",
    options: [
      { id: "A", text: "To assign grades", isCorrect: false },
      { id: "B", text: "To provide feedback for improvement", isCorrect: true },
      { id: "C", text: "To evaluate final learning outcomes", isCorrect: false },
      { id: "D", text: "To rank students", isCorrect: false },
    ],
    timeLimit: 60,
  }

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleSubmit = () => {
    if (!selectedOption) {
      console.error("No option selected!");
      return;
    }
  
    // Find the selected answer
    const selectedAnswer = currentQuestion.options.find((option) => option.id === selectedOption);
  
    if (!selectedAnswer) {
      console.error("Selected option does not match any question options!");
      return;
    }
  
    // Set whether the answer is correct
    setIsAnswerCorrect(selectedAnswer.isCorrect);
    setShowFeedback(true);
  
    // Reset feedback after 2 seconds
    setTimeout(() => {
      setShowFeedback(false);
  
      // If the answer is correct, move to the next level
      if (selectedAnswer.isCorrect) {
        setTimeout(() => {
          setCurrentLevel((prev) => prev + 1);
          setSelectedOption(null); // Reset the selected option
        }, 500);
      }
    }, 2000);
  };

  const getLevelButtonStyle = (status: LevelStatus) => {
    const baseStyle =
      "relative flex justify-between items-center w-full px-10 py-4 text-white font-bold border-0 border-yellow-500 mb-2"

    switch (status) {
      case "current":
        return `${baseStyle} bg-gradient-to-r from-yellow-600 to-orange-500`
      case "completed":
        return `${baseStyle} bg-green-700`
      case "unlocked":
        return `${baseStyle} bg-teal-900 hover:bg-teal-800`
      case "locked":
        return `${baseStyle} bg-teal-900 opacity-80`
    }
  }

  const getOptionStyle = (optionId: string) => {
    const baseStyle = "relative flex items-center w-full px-6 py-3 text-white font-bold border-0 border-yellow-500 mb-4"

    if (selectedOption === optionId) {
      return `${baseStyle} bg-gradient-to-r from-yellow-600 to-orange-500`
    }

    return `${baseStyle} bg-teal-900 hover:bg-teal-800`
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const levelVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const questionVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.5,
      },
    },
  }

  const optionVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
    selected: {
      scale: 1.03,
      boxShadow: "0px 0px 8px rgba(255, 215, 0, 0.6)",
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
    correct: {
      backgroundColor: "#22c55e",
      scale: 1.05,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
    incorrect: {
      backgroundColor: "#ef4444",
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 },
    },
  }

  const submitButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 8px rgba(255, 215, 0, 0.6)",
    },
    tap: { scale: 0.95 },
  }

  const timerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 0.3,
      },
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as "reverse" | "loop" | "mirror" | undefined,
        duration: 1,
      },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <motion.div
        className="flex flex-col md:flex-row p-4 gap-20"
        variants={containerVariants}
        initial="hidden"
        animate={isPageLoaded ? "visible" : "hidden"}
      >
        {/* Levels Column */}
        <motion.div className="md:w-2/3 lg:w-2/5" variants={containerVariants}>
          {levels.map((level, index) => (
            <HexagonButton
              key={level.number}
              className={getLevelButtonStyle(level.status)}
              variants={levelVariants}
              custom={index}
              whileHover={level.status !== "locked" ? { scale: 1.03 } : {}}
              animate={
                level.status === "current"
                  ? {
                      boxShadow: [
                        "0px 0px 0px rgba(255, 215, 0, 0)",
                        "0px 0px 15px rgba(255, 215, 0, 0.7)",
                        "0px 0px 0px rgba(255, 215, 0, 0)",
                      ],
                      transition: {
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                      },
                    }
                  : {}
              }
            >
              <span>{level.number}</span>
              <span className="flex items-center">
                {level.reward} <span className="text-yellow-500 ml-1">💰</span>
              </span>
            </HexagonButton>
          ))}
        </motion.div>

        {/* Question and Options Column */}
        <div className="md:w-1/3 lg:w-3/4">
          <motion.div
            className="bg-teal-900 border-2 border-yellow-500 p-6 rounded-lg mb-8 relative"
            variants={questionVariants}
          >
            <motion.div
              className="absolute top-4 left-4 flex items-center text-yellow-500"
              variants={timerVariants}
              animate={timeLeft < 60 ? "pulse" : "visible"}
            >
              <TimerCircle
                animate={{
                  background: ["rgba(0, 0, 0, 0.3)", "rgba(239, 68, 68, 0.3)", "rgba(0, 0, 0, 0.3)"],
                  transition: {
                    repeat: timeLeft < 60 ? Number.POSITIVE_INFINITY : 0,
                    duration: 1,
                  },
                }}
              >
                <Clock className="h-5 w-5 mr-2" />
              </TimerCircle>
              <motion.span
                className="font-bold ml-2"
                animate={
                  timeLeft < 60
                    ? {
                        color: ["#f59e0b", "#ef4444", "#f59e0b"],
                        transition: { repeat: Number.POSITIVE_INFINITY, duration: 1 },
                      }
                    : {}
                }
              >
                {formatTime(timeLeft)}
              </motion.span>
            </motion.div>

            <motion.h2
              className="text-center text-xl md:text-2xl font-bold mt-8 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {currentQuestion.text}
            </motion.h2>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-3" variants={containerVariants}>
            <AnimatePresence>
              {currentQuestion.options.map((option, index) => (
                <HexagonButton
                  key={option.id}
                  className={getOptionStyle(option.id)}
                  onClick={() => handleOptionSelect(option.id)}
                  aria-pressed={selectedOption === option.id}
                  variants={optionVariants}
                  custom={index}
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  animate={
                    showFeedback && selectedOption === option.id
                      ? option.isCorrect
                        ? "correct"
                        : "incorrect"
                      : selectedOption === option.id
                        ? "selected"
                        : "visible"
                  }
                >
                  <span className="mr-2">{option.id})</span> {option.text}
                </HexagonButton>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div className="flex justify-center mt-8" variants={containerVariants}>
            <HexagonButton
              className="text-white px-6 py-3 bg-teal-900 hover:bg-teal-800"
              onClick={handleSubmit}
              disabled={!selectedOption}
              variants={submitButtonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Submit
            </HexagonButton>
          </motion.div>

          {/* Feedback animation */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className={`p-8 rounded-lg ${isAnswerCorrect ? "bg-green-600" : "bg-red-600"} text-white text-4xl font-bold`}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1.2, // Use only two keyframes
                    rotate: isAnswerCorrect ? 10 : -10, // Add rotation for effect
                  }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {isAnswerCorrect ? "✓ Correct!" : "✗ Incorrect!"}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

