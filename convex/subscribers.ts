import { ConvexError, v } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { hasAccessToOrg } from "./events";

export const getSubscribers = query({
  args: {
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return [];

    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId
    );

    if (!hasAccess) return [];

    const subscribers = await ctx.db
      .query("subscribers")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();

    if (!subscribers) return [];

    return subscribers;
  },
});

async function getSubscriber(
  ctx: QueryCtx | MutationCtx,
  email: string,
  orgId: string
) {
  const subscriber = await ctx.db
    .query("subscribers")
    .withIndex("by_email_orgId", (q) => q.eq("email", email).eq("orgId", orgId))
    .first();

  if (!subscriber) return null;

  return subscriber;
}

export const createSubscriber = mutation({
  args: {
    email: v.string(),
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const subscriber = await getSubscriber(ctx, args.email, args.orgId);

    if (subscriber) {
      throw new ConvexError("Subscriber already exists for this organization");
    }
    // TODO: check if org actually exists before subscribing

    await ctx.db.insert("subscribers", {
      email: args.email,
      orgId: args.orgId,
    });
  },
});
