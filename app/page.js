"use client";

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import Game from "../components/Game";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <SignedOut>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Welcome to Wuzzle (Round - 2 Brain Blast)
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Please sign in to play the game
            </p>
            <div className="animate-bounce">
              <RedirectToSignIn className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-colors duration-200" />
            </div>
          </div>
        </div>
      </SignedOut>
      
      <SignedIn>
        <div className="container mx-auto px-4 py-4">
          <header className="mb-4 text-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              WUZZLE
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Guess the hidden word in 6 tries
            </p>
          </header>
          <Game />
        </div>
      </SignedIn>
    </div>
  );
}