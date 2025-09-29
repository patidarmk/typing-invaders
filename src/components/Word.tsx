"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface WordProps {
  text: string;
  x: number;
  y: number;
  onDestroy: (id: string) => void;
  id: string;
  isPowerUp?: boolean;
  speed: number;
}

const Word: React.FC<WordProps> = ({ text, x, y, onDestroy, id, isPowerUp = false, speed }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const animate = () => {
      if (ref.current) {
        const currentY = parseFloat(ref.current.style.transform.replace('translateY(', '')?.replace('px)', '') || '0');
        if (currentY > window.innerHeight) {
          onDestroy(id);
          return;
        }
        ref.current.style.transform = `translateY(${currentY + speed}px)`;
        requestAnimationFrame(animate);
      }
    };
    animate();
  }, [y, speed, onDestroy, id]);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute font-bold text-xl select-none cursor-pointer transition-all duration-75",
        isPowerUp ? "text-green-600 bg-green-100 px-2 py-1 rounded" : "text-red-600"
      )}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `translateY(${y}px)`,
      }}
      onClick={() => onDestroy(id)} // For testing, but mainly typed
    >
      {text}
    </div>
  );
};

export default Word;