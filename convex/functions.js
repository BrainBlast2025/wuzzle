// convex/functions/submitWin.ts
import { mutation } from "./_generated/server";

export const submitWin = mutation(
  async ({ db }, { userId, word, emailId, guesses, startedAt, status }) => {
    const existingResult = await db
      .query("wins")
      .withIndex("by_email", (q) => q.eq("emailId", emailId))
      .first();

    if (existingResult) {
      return { success: false, message: "You've already played this game!" };
    }

    const duration = Date.now() - startedAt;
    await db.insert("wins", {
      userId,
      word,
      emailId,
      guesses,
      startedAt,
      endedAt: Date.now(),
      duration,
      status, // "won" or "lost"
    });

    return { success: true, message: "Game result recorded!" };
  }
);
