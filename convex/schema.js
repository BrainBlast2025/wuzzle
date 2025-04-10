// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  wins: defineTable({
    userId: v.string(),
    word: v.string(),
    emailId: v.string(),
    guesses: v.number(),
    startedAt: v.number(),
    endedAt: v.number(),
    duration: v.number(),
    status: v.union(v.literal("won"), v.literal("lost")),
  }).index("by_email", ["emailId"]),
});
