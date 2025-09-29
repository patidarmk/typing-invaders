"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { Gamepad2, Trophy, Zap } from "lucide-react";

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 text-center">
      {/* Hero */}
      <div className="space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Typing Invaders
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Defend your base from falling words! Type accurately to destroy invaders, build combos, unlock levels, and grab power-ups for epic wins.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => navigate({ to: "/play" })} className="w-full sm:w-auto">
            <Gamepad2 className="mr-2 h-5 w-5" />
            Play Now
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate({ to: "/leaderboard" })} className="w-full sm:w-auto">
            <Trophy className="mr-2 h-5 w-5" />
            View Leaderboard
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Multiple Levels</CardTitle>
            <CardDescription>Start easy, ramp up difficulty with faster invaders and tougher words.</CardDescription>
          </CardHeader>
          <CardContent>
            <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Combo System</CardTitle>
            <CardDescription>Chain correct types for multipliers and massive scores!</CardDescription>
          </CardHeader>
          <CardContent>
            <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Power-Ups</CardTitle>
            <CardDescription>Grab rare power-ups to slow enemies, gain lives, or clear the screen.</CardDescription>
          </CardHeader>
          <CardContent>
            <Zap className="h-12 w-12 text-green-600 mx-auto mb-4" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;