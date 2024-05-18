import { QueryCtx, MutationCtx } from "./_generated/server.d";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUser } from "./users";
import { paginationOptsValidator, PaginationResult } from "convex/server";

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity)
    throw new ConvexError("You must be logged in to create an event.");

  return await ctx.storage.generateUploadUrl();
});

export async function hasAccessToOrg(
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string,
  orgId: string
) {
  const user = await getUser(ctx, tokenIdentifier);

  const hasAccess =
    user.orgIds.includes(orgId) || user.tokenIdentifier.includes(orgId);

  return hasAccess;
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
    const identity = await ctx.auth.getUserIdentity();

    if (!identity)
      throw new ConvexError("You must be logged in to create an event.");

    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId
    );

    if (!hasAccess)
      throw new ConvexError("you do not have access to this organization");

    await ctx.db.insert("events", {
      name: args.name,
      orgId: args.orgId,
      location: args.location,
      date: args.date,
      description: args.description,
      imgId: args.imgId,
    });
  },
});

export const getEvents = query({
  args: {
    orgId: v.string(),
    query: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return [];

    // ? May want to let everyone get events? maybe remove later
    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId
    );

    if (!hasAccess) return [];

    let events = await ctx.db
      .query("events")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .collect();

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

export const deleteEvent = mutation({
  args: { eventId: v.id("events") },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity)
      throw new ConvexError("You must be logged in to create an event.");

    const event = await ctx.db.get(args.eventId);

    if (!event) throw new ConvexError("event does not exist.");

    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      event.orgId
    );

    if (!hasAccess) throw new ConvexError("you do not have access to event.");

    await ctx.db.delete(args.eventId);
  },
});

// ? Look into paginated queries and full text search queries.
// export const list = query({
//   args: { paginationOpts: paginationOptsValidator, orgId: v.string() },
//   handler: async (ctx, args) => {
//     const results = await ctx.db
//       .query("events")
//       .filter((q) => q.eq(q.field("orgId"), args.orgId))
//       .order("desc")
//       .paginate(args.paginationOpts);

//     return {
//       ...results,
//       page: await Promise.all(
//         results.page.map(async (event) => ({
//           ...event,
//           url: await ctx.storage.getUrl(event.imgId),
//         }))
//       ),
//     };
//   },
// });

export const getActiveEventsByUser = query({
  args: { paginationOpts: paginationOptsValidator, orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError("user is not logged in");

    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId
    );

    if (!hasAccess)
      throw new ConvexError("user does not have access to events");

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

    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId
    );

    if (!hasAccess)
      throw new ConvexError("user does not have access to events");

    const events = await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("orgId"), args.orgId))
      .order("desc")
      .paginate(args.paginationOpts);

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
