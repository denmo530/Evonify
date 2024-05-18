import { QueryCtx, MutationCtx } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUser } from "./users";
import { Doc } from "./_generated/dataModel";
import { hasAccessToOrg } from "./events";

export async function getNotification(
  ctx: QueryCtx | MutationCtx,
  title: string,
  authorId: string
) {
  const notification = await ctx.db
    .query("notifications")
    .withIndex("by_authorId_title", (q) =>
      q.eq("authorId", authorId).eq("title", title)
    )
    .first();

  if (!notification) return null;

  return notification;
}

export const getNotificationsByAuthorId = query({
  args: {
    authorId: v.string(),
  },
  async handler(ctx, args) {
    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_authorId", (q) => q.eq("authorId", args.authorId))
      .order("desc")
      .collect();

    if (!notifications) return [];

    return notifications;
  },
});

export const getNotificationsByAuthorIdAndTitle = query({
  args: {
    authorId: v.string(),
    title: v.string(),
  },
  async handler(ctx, args) {
    const notification = await ctx.db
      .query("notifications")
      .withIndex("by_authorId_title", (q) =>
        q.eq("authorId", args.authorId).eq("title", args.title)
      )
      .first();

    if (!notification) return null;

    return notification;
  },
});

export const createNotification = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    authorId: v.string(),
  },
  async handler(ctx, args) {
    const notification = await getNotification(ctx, args.title, args.authorId);

    // If notification already exists then do an update of the document
    if (notification) {
      await ctx.db.patch(notification._id, {
        title: args.title,
        content: args.content,
        authorId: args.authorId,
      });

      return { success: true, message: "Notification updated successfully" };
    }

    await ctx.db.insert("notifications", {
      title: args.title,
      content: args.content,
      authorId: args.authorId,
    });

    return { success: true, message: "Notification created successfully" };
  },
});

export const deleteNotification = mutation({
  args: { notificationId: v.id("notifications") },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity)
      throw new ConvexError("You must be logged in to create an event.");

    const notification = await ctx.db.get(args.notificationId);

    if (!notification) throw new ConvexError("event does not exist.");

    const hasAccess = await hasAccessToOrg(ctx, notification.authorId);

    if (!hasAccess) throw new ConvexError("you do not have access to event.");

    await ctx.db.delete(args.notificationId);
  },
});
