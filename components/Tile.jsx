"use client";

import { useEffect, useState } from "react";

export default function Tile({ letter, status, position }) {
  const [flipped, setFlipped] = useState(false);
  const [delay, setDelay] = useState(0);

  // Calculate flip animation delay based on position
  useEffect(() => {
    if (letter && status) {
      const columnDelay = position % 5;
      setDelay(columnDelay * 100);
      const timer = setTimeout(() => setFlipped(true), 100);
      return () => clearTimeout(timer);
    }
  }, [letter, status, position]);

  // Reset flip state when letter changes
  useEffect(() => {
    if (!letter) {
      setFlipped(false);
    }
  }, [letter]);

  const getBackgroundColor = () => {
    switch (status) {
      case "correct":
        return "bg-green-500 dark:bg-green-600";
      case "present":
        return "bg-yellow-500 dark:bg-yellow-600";
      case "absent":
        return "bg-gray-500 dark:bg-gray-700";
      default:
        return "bg-gray-300 dark:bg-gray-700"; // Changed to gray for empty cells
    }
  };

  const getBorderColor = () => {
    return letter && !status 
      ? "border-gray-400 dark:border-gray-500" 
      : "border-gray-300 dark:border-gray-600"; // Always show border
  };

  const getTextColor = () => {
    return status ? "text-white" : "text-gray-800 dark:text-white";
  };

  return (
    <div
      className={`
        w-14 h-14 sm:w-12 sm:h-12 
        flex items-center justify-center
        text-2xl sm:text-3xl font-bold uppercase
        border-2 ${getBorderColor()} rounded
        ${flipped ? getBackgroundColor() : letter ? "bg-gray-100 dark:bg-gray-700" : "bg-gray-100 dark:bg-gray-800"}
        ${getTextColor()}
        transition-all duration-500 ease-in-out
        ${flipped ? "scale-100" : "scale-90"}
        transform-gpu
      `}
      style={{
        transitionDelay: `${delay}ms`,
        animation: flipped ? "bounce 0.3s ease-in-out" : "none"
      }}
    >
      {letter}
    </div>
  );
}