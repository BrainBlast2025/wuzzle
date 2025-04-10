// app/layout.js
"use client";

import "./globals.css";
import { Inter } from 'next/font/google';
import { ConvexProvider } from "convex/react";
import convex from "../lib/convexClient";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>Wuzzle</title>
        <meta name="description" content="A Wordle game with Clerk and Convex" />
        <meta name="theme-color" content="#6aaa64" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} h-full bg-gray-50 dark:bg-gray-900`}>
        <ClerkProvider>
          <ConvexProvider client={convex}>
            <div className="min-h-full flex flex-col">
              <main className="flex-1 flex flex-col items-center py-2 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md mx-auto">
                  {children}
                </div>
              </main>
              
              <footer className="text-center text-sm text-gray-500 dark:text-gray-400">
                <p>Wuzzle © {new Date().getFullYear()}</p>
              </footer>
            </div>
          </ConvexProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}