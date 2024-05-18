import { QueryCtx, MutationCtx } from "./_generated/server.d";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUser } from "./users";
import { paginationOptsValidator, PaginationResult } from "convex/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { Doc, Id } from "./_generated/dataModel";

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity)
    throw new ConvexError("You must be logged in to create an event.");

  return await ctx.storage.generateUploadUrl();
});

export async function hasAccessToOrg(
  ctx: QueryCtx | MutationCtx,
  orgId: string
) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) return null;

  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier)
    )
    .first();

  if (!user) {
    return null;
  }

  const hasAccess =
    user.orgIds.some((item) => item === orgId) ||
    user.tokenIdentifier.includes(orgId);

  if (!hasAccess) {
    return null;
  }
  return { user };
}

export const createEvent = mutation({
  args: {
    name: v.string(),
    orgId: v.string(),
    location: v.string(),
    date: v.string(),
    description: v.string(),
    imgId: v.id("_storage"),
  },
  async handler(ctx, args) {
    const hasAccess = await hasAccessToOrg(ctx, args.orgId);

    if (!hasAccess)
      throw new ConvexError("you do not have access to this organization");

    await ctx.db.insert("events", {
      name: args.name,
      orgId: args.orgId,
      location: args.location,
      date: args.date,
      description: args.description,
      imgId: args.imgId,
      userId: hasAccess.user._id,
    });
  },
});

export const getEvents = query({
  args: {
    query: v.optional(v.string()),
  },
  async handler(ctx, args) {
    let events = await ctx.db.query("events").order("desc").collect();
    const eventsWithUrl = await Promise.all(
      events.map(async (event) => ({
        ...event,
        url: await ctx.storage.getUrl(event.imgId),
      }))
    );

    const query = args.query;

    if (!query) return eventsWithUrl;

    return eventsWithUrl.filter((event) =>
      event.name.toLowerCase().includes(query.toLowerCase())
    );
  },
});

async function hasAccessToEvent(
  ctx: QueryCtx | MutationCtx,
  eventId: Id<"events">
) {
  const event = await ctx.db.get(eventId);

  if (!event) {
    return null;
  }

  const hasAccess = await hasAccessToOrg(ctx, event.orgId);

  if (!hasAccess) {
    return null;
  }

  return { user: hasAccess.user, event };
}

function assertCanDeleteEvent(user: Doc<"users">, event: Doc<"events">) {
  const canDelete =
    event.userId === user._id ||
    user.orgIds.find((orgId) => orgId === event.orgId);

  if (!canDelete) {
    throw new ConvexError("you have no acces to delete this event");
  }
}

export const deleteEvent = mutation({
  args: { eventId: v.id("events") },
  async handler(ctx, args) {
    const access = await hasAccessToEvent(ctx, args.eventId);

    if (!access) throw new ConvexError("no access to event.");

    assertCanDeleteEvent(access.user, access.event);

    await ctx.db.delete(args.eventId);
  },
});

export const getActiveEventsByUser = query({
  args: { paginationOpts: paginationOptsValidator, orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError("user is not logged in");

    const hasAccess = await hasAccessToOrg(ctx, args.orgId);

    if (!hasAccess) throw new ConvexError("no access to org");

    const events = await ctx.db
      .query("events")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .paginate(args.paginationOpts);

    const eventsWithUrl = await Promise.all(
      events.page.map(async (event) => ({
        ...event,
        url: await ctx.storage.getUrl(event.imgId),
      }))
    );

    if (events.page.length === 0) return events;

    const activeEvents = eventsWithUrl.filter((event) => {
      const eventTimestamp = Date.parse(event.date); // Convert event date to timestamp
      const currentTimestamp = Date.now(); // Get current timestamp
      return eventTimestamp >= currentTimestamp;
    });

    return {
      ...events,
      page: activeEvents,
    };
  },
});

export const getPrevEventsByUser = query({
  args: { paginationOpts: paginationOptsValidator, orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError("user is not logged in");

    const hasAccess = await hasAccessToOrg(ctx, args.orgId);

    if (!hasAccess) throw new ConvexError("no access to org");

    const events = await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("orgId"), args.orgId))
      .order("desc")
      .paginate(args.paginationOpts);

    if (events.page.length === 0) return events;

    const eventsWithUrl = await Promise.all(
      events.page.map(async (event) => ({
        ...event,
        url: await ctx.storage.getUrl(event.imgId),
      }))
    );

    const prevEvents = eventsWithUrl.filter((event) => {
      const eventTimestamp = Date.parse(event.date); // Convert event date to timestamp
      const currentTimestamp = Date.now(); // Get current timestamp
      return eventTimestamp < currentTimestamp;
    });

    return {
      ...events,
      page: prevEvents,
    };
  },
});
