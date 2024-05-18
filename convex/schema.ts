import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({
    name: v.string(),
    userId: v.id("users"),
    orgId: v.string(),
    location: v.string(),
    date: v.string(),
    description: v.string(),
    imgId: v.id("_storage"),
  }).index("by_orgId", ["orgId"]),

  users: defineTable({
    tokenIdentifier: v.string(),
    orgIds: v.array(v.string()),
    name: v.string(),
    email: v.string(),
    profileImg: v.optional(v.string()),
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .index("by_orgIds", ["orgIds"]),

  subscribers: defineTable({
    email: v.string(),
    orgId: v.string(),
  })
    .index("by_email_orgId", ["email", "orgId"])
    .index("by_orgId", ["orgId"]),
  notifications: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.string(),
  })
    .index("by_authorId_title", ["authorId", "title"])
    .index("by_authorId", ["authorId"]),
});
