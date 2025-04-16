// convex/wins.js
import { query } from "./_generated/server";

export const getLeaderboard = query({
  handler: async (ctx) => {
    const wins = await ctx.db.query("wins")
      .filter(q => q.eq(q.field("status"), "won")) // Only include wins
      .order("asc") // Default order is by _creationTime, but we'll override
      .collect();

    // Sort first by guesses, then by duration
    const sortedWins = wins.sort((a, b) => {
      return a.duration - b.duration; // If guesses are equal, shorter duration comes first
    });

    return sortedWins;
  },
});