"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">About Typing Invaders</h1>
      <Card>
        <CardHeader>
          <CardTitle>How to Play</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Words fall from the top like space invaders. Type them exactly and press Enter or Space to destroy them before they reach the bottom. Build combos for bonus points, level up for challenges, and collect power-ups!</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-1">
            <li>5 Progressive levels with increasing speed and word complexity</li>
            <li>Combo multiplier up to 10x for consecutive hits</li>
            <li>3 Lives, lose one if a word hits the ground</li>
            <li>Power-ups: SLOW (halves speed for 5s), LIFE (+1 life), COMBO (+3 streak), CLEAR (removes all words)</li>
            <li>Local leaderboard tracks top 10 scores</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;