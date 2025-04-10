"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function RulesDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
          How to Play
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-white">
              Wuzzle Rules
            </DialogTitle>
            <DialogClose asChild>
              <Button size="icon" className="bg-red-500 cursor-pointer h-8 w-8">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 text-gray-700 dark:text-gray-300 py-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">How to Play</h2>
          <p>Guess the hidden 5-letter word in 6 tries or less.</p>
          
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Game Rules</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Each guess must be a valid 5-letter word</li>
            <li>Press Enter to submit your guess</li>
            <li>After each guess, the color of the tiles will change to show how close your guess was</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Tile Colors</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center mr-3">
                <span className="text-white font-bold">A</span>
              </div>
              <span>Letter is in the correct position</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center mr-3">
                <span className="text-white font-bold">B</span>
              </div>
              <span>Letter is in the word but wrong position</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-500 rounded flex items-center justify-center mr-3">
                <span className="text-white font-bold">C</span>
              </div>
              <span>Letter is not in the word</span>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Tips</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Start with words that contain common vowels</li>
            <li>Pay attention to which letters have been ruled out</li>
            <li>Try to eliminate as many letters as possible with each guess</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}