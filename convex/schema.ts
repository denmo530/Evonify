import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({
    name: v.string(),
    orgId: v.string(),
    location: v.string(),
    date: v.string(),
    description: v.string(),
    imgId: v.id("_storage"),
  }).index("by_orgId", ["orgId"]),

  users: defineTable({
    tokenIdentifier: v.string(),
    orgIds: v.array(v.string()),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),

  subscribers: defineTable({
    email: v.string(),
    orgId: v.string(),
  }).index("by_email_orgId", ["email", "orgId"]),
});
