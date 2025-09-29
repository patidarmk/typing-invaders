"use client";

import Leaderboard from "@/components/Leaderboard";

const LeaderboardPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Leaderboard</h1>
      <Leaderboard />
    </div>
  );
};

export default LeaderboardPage;