import "./globals.css";
import { Inter } from 'next/font/google';
import ClerkProviderWithNavigation from "../lib/clerkProvider";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Wuzzle",
  description: "A Wordle game with Clerk and Convex",
  themeColor: '#6aaa64', // Wordle green
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Favicon for Wordle */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} h-full bg-gray-50 dark:bg-gray-900`}>
        <ClerkProviderWithNavigation>
          <div className="min-h-full flex flex-col">
            {/* Header would be included in your ClerkProviderWithNavigation */}
            <main className="flex-1 flex flex-col items-center py-2 px-4 sm:px-6 lg:px-8">
              <div className="w-full max-w-md mx-auto">
                {children}
              </div>
            </main>
            
            {/* Footer */}
            <footer className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>Wuzzle © {new Date().getFullYear()}</p>
            </footer>
          </div>
        </ClerkProviderWithNavigation>
      </body>
    </html>
  );
}