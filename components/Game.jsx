"use client";

import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { ConvexProvider } from "convex/react";
import convex from "../lib/convexClient";
import { useUser } from "@clerk/nextjs";
import Board from "./Board";
import Keyboard from "./Keyboard";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { TECHNICAL_WORDS, ALL_VALID_WORDS } from "../utils/words";
import { toast } from "react-hot-toast";
import Link from "next/link";

const TARGET_WORD = TECHNICAL_WORDS[Math.floor(Math.random() * TECHNICAL_WORDS.length)].toUpperCase();

function GameInner() {
  const { user } = useUser();
  const router = useRouter();
  const submitWin = useMutation(api.functions.submitWin);
  const [guesses, setGuesses] = useState([]);
  const [current, setCurrent] = useState("");
  const [gameStatus, setGameStatus] = useState("playing");
  const [usedKeys, setUsedKeys] = useState({});
  const [invalidWord, setInvalidWord] = useState(false);
  const gameStartTime = useRef(Date.now());

  const isValidWord = (word) => {
    return ALL_VALID_WORDS.includes(word.toLowerCase());
  };

  useEffect(() => {
    const newUsedKeys = {};
    guesses.forEach((guess) => {
      Array.from(guess).forEach((letter, i) => {
        if (letter === TARGET_WORD[i]) {
          newUsedKeys[letter] = "correct";
        } else if (TARGET_WORD.includes(letter)) {
          newUsedKeys[letter] = "present";
        } else {
          newUsedKeys[letter] = "absent";
        }
      });
    });
    setUsedKeys(newUsedKeys);
  }, [guesses]);

  const handleKey = async (key) => {
    if (gameStatus !== "playing") return;

    if (key === "Enter" && current.length === 5) {
      if (!isValidWord(current)) {
        setInvalidWord(true);
        setTimeout(() => setInvalidWord(false), 1000);
        return;
      }

      const updatedGuesses = [...guesses, current];
      setGuesses(updatedGuesses);
      setCurrent("");

      const commonPayload = {
        userId: user.id,
        word: TARGET_WORD,
        emailId: user.primaryEmailAddress.emailAddress,
        guesses: updatedGuesses.length,
        startedAt: gameStartTime.current,
      };

      if (current.toUpperCase() === TARGET_WORD) {
        try {
          const result = await submitWin({ ...commonPayload, status: "won" });
          setGameStatus("won");
          if (result.success) {
            alert(`🎉 Congratulations! You won in ${updatedGuesses.length} guess${updatedGuesses.length === 1 ? "" : "es"}!`);
          } else {
            alert(result.message);
          }
        } catch (error) {
          setGameStatus("won");
          alert("Error submitting your win: " + error.message);
        }
      } else if (updatedGuesses.length >= 6) {
        setGameStatus("lost");
        try {
          await submitWin({ ...commonPayload, status: "lost" });
        } catch (error) {
          console.error("Error submitting loss:", error.message);
        }
        alert(`Game over! The word was ${TARGET_WORD}`);
      }
    } else if (key === "Backspace") {
      setCurrent(current.slice(0, -1));
    } else if (/^[A-Za-z]$/.test(key) && current.length < 5) {
      setCurrent(current + key.toUpperCase());
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleKey("Enter");
      } else if (e.key === "Backspace") {
        handleKey("Backspace");
      } else if (/^[A-Za-z]$/.test(e.key)) {
        handleKey(e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current, gameStatus]);

  return (
    <div className="game-container">
      {invalidWord && <div className="invalid-word-message">Not a valid word!</div>}

      <div className="min-h-screen flex flex-col items-center justify-start px-2 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md flex flex-col items-center h-[85vh] p-1">
          <header className="w-full mb-1 text-center">
            <Link href="/rules" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              How to Play
            </Link>
            <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300 mt-1 px-2">
              <span>Player: {user?.firstName || "Guest"}</span>
              <span>Guesses: {guesses.length}/6</span>
            </div>
          </header>

          <div className="flex-1 w-full flex items-center justify-center max-h-[55vh] mt-5">
            <Board guesses={guesses} currentGuess={current} targetWord={TARGET_WORD} />
          </div>

          <div className="w-full max-w-md mb-1 mt-auto">
            <Keyboard onKey={handleKey} usedKeys={usedKeys} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Game() {
  return (
    <ConvexProvider client={convex}>
      <GameInner />
    </ConvexProvider>
  );
}
