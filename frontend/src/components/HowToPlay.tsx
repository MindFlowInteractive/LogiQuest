import React from "react";

const HowToPlay = () => {
  return (
    <div className="bg-black text-white py-16 px-6 text-center">
      <h2 className="text-4xl font-bold">How To Play</h2>
      <p className="mt-6 text-xl font-semibold">Welcome to LogiQuest!</p>
      <p className="mt-2 text-lg">Get ready to test your logic and knowledge! Here’s a quick guide to help you start your journey.</p>
      
      <div className="flex flex-col items-center mt-12">
        <div className="grid grid-cols-2 gap-6 max-w-6xl">
          <div className="bg-[#033330] text-white p-6 border-8 border-red-500">
            <h3 className="font-bold text-lg">1. Choose Your Game Mode</h3>
            <p className="text-sm mt-3">Select from various modes like Classic, Challenge, Multiplayer, and more. Each mode offers a unique experience!</p>
          </div>
          <div className="bg-[#033330] text-white p-6 border-8 border-yellow-500">
            <h3 className="font-bold text-lg">2. Understand the Rules</h3>
            <p className="text-sm mt-3">Each question will present you with four options (A, B, C, D). You have a limited time (usually 2 minutes) to answer each question.</p>
          </div>
        </div>
        <div className="bg-[#033330] text-white p-12 border-8 border-yellow-500 w-full max-w-3xl mt-6">
          <h3 className="font-bold text-lg">3. Make Your Choice</h3>
          <p className="text-sm mt-3">Click on your selected answer. If you're unsure, use lifelines to help you:</p>
          <ul className="list-disc list-inside text-sm mt-3">
            <li><strong>Remove Two Wrong Answers:</strong> Eliminates two incorrect options.</li>
            <li><strong>Get Probability Insights:</strong> See the likelihood of each option being correct.</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-6 max-w-6xl mt-6">
          <div className="bg-[#033330] text-white p-6 border-8 border-red-500">
            <h3 className="font-bold text-lg">4. Track Your Progress</h3>
            <p className="text-sm mt-3">Your score will be based on accuracy and speed. Compete for high scores on the leaderboard!</p>
          </div>
          <div className="bg-[#033330] text-white p-6 border-8 border-red-500">
            <h3 className="font-bold text-lg">5. Enjoy and Share!</h3>
            <p className="text-sm mt-3">Share your achievements with friends and challenge them to beat your score!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
