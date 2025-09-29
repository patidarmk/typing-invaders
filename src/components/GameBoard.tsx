"use client";

import * as React from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Word from "./Word";
import { wordsByLevel, powerUps } from "@/data/words";
import { useNavigate } from "@tanstack/react-router";
import { showSuccess, showError } from "@/utils/toast";

interface GameWord {
  id: string;
  text: string;
  x: number;
  y: number;
  speed: number;
  isPowerUp: boolean;
}

const GameBoard: React.FC = () => {
  const [words, setWords] = React.useState<GameWord[]>([]);
  const [input, setInput] = React.useState("");
  const [score, setScore] = React.useState(0);
  const [level, setLevel] = React.useState(1);
  const [combo, setCombo] = React.useState(0);
  const [lives, setLives] = React.useState(3);
  const [gameOver, setGameOver] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | null>(null);
  const [powerUpActive, setPowerUpActive] = React.useState<{ type: string; duration: number } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const currentWords = wordsByLevel[level as keyof typeof wordsByLevel] || wordsByLevel[5];
  const maxLevel = 5;

  // Spawn new word or power-up every 2-3 seconds, adjusted by level
  React.useEffect(() => {
    if (gameOver || isPaused) return;

    const id = setInterval(() => {
      const isPowerUp = Math.random() < 0.1; // 10% chance for power-up
      const text = isPowerUp ? powerUps[Math.floor(Math.random() * powerUps.length)] : currentWords[Math.floor(Math.random() * currentWords.length)];
      const x = Math.random() * (window.innerWidth - 200); // Random x position
      const y = 0;
      const speed = 2 + level * 1.5; // Increase speed with level

      setWords((prev) => [...prev, { id: Date.now().toString(), text, x, y, speed, isPowerUp }]);
    }, 3000 - level * 300); // Faster spawn with higher levels

    setIntervalId(id);
    return () => clearInterval(id);
  }, [level, gameOver, isPaused, currentWords]);

  // Animate falling words
  React.useEffect(() => {
    if (gameOver || isPaused) return;

    const animate = () => {
      setWords((prev) =>
        prev.map((word) => ({
          ...word,
          y: word.y + word.speed,
        })).filter((word) => {
          if (word.y > window.innerHeight) {
            setLives((prev) => {
              const newLives = prev - 1;
              if (newLives <= 0) {
                setGameOver(true);
                saveScore();
                showError("Game Over! Final Score: " + score);
                navigate({ to: "/leaderboard" });
              }
              return newLives;
            });
            return false;
          }
          return true;
        })
      );
      if (!gameOver) requestAnimationFrame(animate);
    };
    animate();

    // Power-up timer
    if (powerUpActive) {
      const timer = setTimeout(() => setPowerUpActive(null), powerUpActive.duration);
      return () => clearTimeout(timer);
    }
  }, [gameOver, isPaused, powerUpActive, score, navigate]);

  // Level up on score milestones
  React.useEffect(() => {
    if (score > level * 100 && level < maxLevel) {
      setLevel((prev) => prev + 1);
      setCombo(0);
      showSuccess(`Level ${level + 1} Unlocked!`);
    }
  }, [score, level]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameOver || isPaused) return;
    setInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e?: React.KeyboardEvent) => {
    if (e && e.key !== "Enter" && e.key !== " ") return;
    if (!input.trim() || gameOver || isPaused) return;

    const matchedWord = words.find((w) => w.text.toLowerCase() === input.toLowerCase());
    if (matchedWord) {
      setWords((prev) => prev.filter((w) => w.id !== matchedWord.id));
      const basePoints = matchedWord.isPowerUp ? 50 : 10;
      const comboMultiplier = Math.min(combo + 1, 10); // Max combo 10x
      const points = basePoints * comboMultiplier * level;
      setScore((prev) => prev + points);
      setCombo((prev) => prev + 1);

      if (matchedWord.isPowerUp) {
        activatePowerUp(matchedWord.text);
      }

      showSuccess(`Destroyed! +${points} points (Combo: ${combo + 1}x)`);
    } else {
      setCombo(0);
      showError("Miss! Combo reset.");
    }

    setInput("");
  };

  const activatePowerUp = (type: string) => {
    switch (type) {
      case "SLOW":
        setPowerUpActive({ type: "SLOW", duration: 5000 });
        // Reduce speed temporarily by updating words
        setWords((prev) => prev.map((w) => ({ ...w, speed: w.speed * 0.5 })));
        setTimeout(() => setWords((prev) => prev.map((w) => ({ ...w, speed: w.speed * 2 }))), 5000);
        break;
      case "LIFE":
        setLives((prev) => Math.min(prev + 1, 5));
        break;
      case "COMBO":
        setCombo((prev) => prev + 3);
        break;
      case "CLEAR":
        setWords([]);
        break;
    }
  };

  const saveScore = () => {
    const highScores = JSON.parse(localStorage.getItem("typingInvadersScores") || "[]") as { name: string; score: number }[];
    const newScore = { name: "Player", score }; // TODO: Prompt for name
    const updated = [...highScores, newScore].sort((a, b) => b.score - a.score).slice(0, 10);
    localStorage.setItem("typingInvadersScores", JSON.stringify(updated));
  };

  const resetGame = () => {
    setWords([]);
    setInput("");
    setScore(0);
    setLevel(1);
    setCombo(0);
    setLives(3);
    setGameOver(false);
    setPowerUpActive(null);
    if (intervalId) clearInterval(intervalId);
  };

  if (gameOver) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Game Over</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Final Score: {score}</p>
          <Button onClick={resetGame}>Play Again</Button>
          <Button variant="outline" onClick={() => navigate({ to: "/leaderboard" })}>
            View Leaderboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative h-[600px] bg-black/20 rounded-lg overflow-hidden border-2 border-gray-300">
      {/* Game HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 text-white">
        <div>
          <Badge variant="secondary">Level {level}</Badge>
          <Badge variant="default" className="ml-2">Lives: {lives}</Badge>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">Score: {score}</p>
          <p className="text-sm">Combo: {combo}x</p>
        </div>
      </div>

      {/* Falling Words */}
      {words.map((word) => (
        <Word
          key={word.id}
          {...word}
          onDestroy={(id) => setWords((prev) => prev.filter((w) => w.id !== id))}
          speed={powerUpActive?.type === "SLOW" ? word.speed * 0.5 : word.speed}
        />
      ))}

      {/* Input */}
      <div className="absolute bottom-4 left-4 right-4">
        <Input
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
          placeholder="Type the falling words! Press Enter or Space to submit"
          className="text-center text-xl bg-white/90"
          autoFocus
          disabled={isPaused}
        />
      </div>

      {/* Pause Button */}
      <Button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-4 right-4 z-10"
        variant={isPaused ? "default" : "outline"}
      >
        {isPaused ? "Resume" : "Pause"}
      </Button>
    </div>
  );
};

export default GameBoard;