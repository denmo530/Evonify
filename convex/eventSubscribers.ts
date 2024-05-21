import { ConvexError, v } from "convex/values";
import { mutation, QueryCtx } from "./_generated/server";
import { getEventById } from "./events";
import { Id } from "./_generated/dataModel";

async function getSubscriber(
  ctx: QueryCtx,
  email: string,
  eventId: Id<"events">
) {
  const subscriber = await ctx.db
    .query("eventSubscribers")
    .withIndex("by_email_eventId", (q) =>
      q.eq("email", email).eq("eventId", eventId)
    )
    .first();

  return subscriber;
}

export const createSubscriber = mutation({
  args: {
    email: v.string(),
    eventId: v.id("events"),
  },
  async handler(ctx, args) {
    const event = await getEventById(ctx, { eventId: args.eventId });

    if (!event) {
      throw new ConvexError("No event found with that ID");
    }

    const subscriber = await getSubscriber(ctx, args.email, args.eventId);

    if (subscriber) throw new ConvexError("Subscriber already exists");

    await ctx.db.insert("eventSubscribers", {
      email: args.email,
      eventId: args.eventId,
    });

    // TODO: send confirmation email
  },
});

export const deleteSubscriber = mutation({
  args: {
    email: v.string(),
    eventId: v.id("events"),
  },
  async handler(ctx, args) {
    const subscriber = await getSubscriber(ctx, args.email, args.eventId);

    if (!subscriber) throw new ConvexError("Subscriber not found");

    await ctx.db.delete(subscriber._id);
  },
});
