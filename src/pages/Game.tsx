"use client";

import GameBoard from "@/components/GameBoard";

const Game: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Typing Invaders - Level {1} // Dynamic level would be here
      </h1>
      <GameBoard />
    </div>
  );
};

export default Game;