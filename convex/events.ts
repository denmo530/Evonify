import { QueryCtx, MutationCtx } from "./_generated/server.d";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { Doc, Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import { hasAccessToOrg } from "./helpers";

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity)
    throw new ConvexError("You must be logged in to create an event.");

  return await ctx.storage.generateUploadUrl();
});

export const getEventById = query({
  args: { eventId: v.id("events") },
  async handler(ctx, args) {
    const event = await ctx.db.get(args.eventId);

    if (!event) {
      throw new ConvexError("event not found");
    }

    const url = await ctx.storage.getUrl(event.imgId);

    return { ...event, url };
  },
});

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

    // Send out email to users

    // get organiser's subscriber list
    const subscribers = await ctx.db
      .query("subscribers")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();

    console.log(subscribers);
    // send email to subscribers
    await Promise.all(
      subscribers.map(async (subscriber) => {
        await ctx.scheduler.runAfter(
          0,
          internal.emails.emails.sendEventCreatedEmail,
          {
            email: subscriber.email,
            org: hasAccess.user.name,
            eventName: args.name,
            userEmail: hasAccess.user.email,
            eventImg: await ctx.storage.getUrl(args.imgId),
          }
        );
      })
    );
  },
});

export const updateEvent = mutation({
  args: {
    eventId: v.id("events"),
    name: v.optional(v.string()),
    location: v.optional(v.string()),
    date: v.optional(v.string()),
    description: v.optional(v.string()),
    imgId: v.optional(v.id("_storage")),
  },
  async handler(ctx, args) {
    const access = await hasAccessToEvent(ctx, args.eventId);

    if (!access) throw new ConvexError("no access to event.");

    const event = await getEventById(ctx, { eventId: args.eventId });

    const { eventId, ...updatedValues } = args;

    // Create an object with the fields to be updated, using existing values for undefined fields
    const newValues = {
      name: updatedValues.name ?? event.name,
      location: updatedValues.location ?? event.location,
      date: updatedValues.date ?? event.date,
      description: updatedValues.description ?? event.description,
      imgId: updatedValues.imgId ?? event.imgId,
    };

    await ctx.db.patch(event._id, {
      ...newValues,
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

export const getEventsByUser = query({
  args: {
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError("user is not logged in");

    const hasAccess = await hasAccessToOrg(ctx, args.orgId);

    if (!hasAccess) return [];

    return await ctx.db
      .query("events")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .collect();
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

    if (!hasAccess) return { page: [], isDone: true, continueCursor: "" };

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

    if (!hasAccess) return { page: [], isDone: true, continueCursor: "" };

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
