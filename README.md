# Wuzzle - A Wordle Clone with Next.js

&#x20;

Wuzzle is a Wordle-inspired word guessing game built with Next.js, featuring authentication via Clerk and real-time data management with Convex. Players get 6 attempts to guess a hidden 5-letter technical word.

## Features

- 🔐 Secure authentication using Clerk
- 🎮 Classic Wordle gameplay with keyboard input
- 📊 Game statistics tracking via Convex
- 📱 Responsive design for all devices
- 📜 Interactive rules dialog
- 🏆 Win/loss tracking with user profiles

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Authentication**: Clerk
- **Backend**: Convex
- **UI**: Shadcn/ui components
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Convex account
- Clerk account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/BrainBlast2025/wuzzle.git
   cd wuzzle
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following:

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   CONVEX_DEPLOYMENT=your_convex_deployment
   ```

4. Set up Convex:

   ```bash
   npx convex dev
   ```

5. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Deployment

1. **Vercel**:

   - Connect your GitHub repository
   - Add environment variables
   - Deploy!

2. **Convex Production**:

   ```bash
   npx convex deploy
   ```

## Game Rules

1. Guess the hidden 5-letter technical word in 6 tries
2. Each guess must be a valid word with no repeated letters
3. Letters change color to show how close your guess was:
   - 🟩 Green: Correct letter in correct position
   - 🟨 Yellow: Correct letter in wrong position
   - ⬛ Gray: Letter not in the word

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT

## Acknowledgments

- Inspired by Wordle
- Built with Next.js, Clerk, and Convex
- UI components from shadcn/ui

