import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server.d";

export const createEvent = mutation({
  args: {
    name: v.string(),
  },
  async handler(ctx, args) {
    const identity = ctx.auth.getUserIdentity();
    if (!identity)
      throw new ConvexError("You must be logged in to create an event.");

    await ctx.db.insert("events", {
      name: args.name,
    });
  },
});

export const getEvents = query({
  args: {},
  async handler(ctx, args) {
    const identity = ctx.auth.getUserIdentity();

    if (!identity) return [];

    return ctx.db.query("events").collect();
  },
});
