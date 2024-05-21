import { ConvexError, v } from "convex/values";
import {
  action,
  httpAction,
  internalAction,
  mutation,
  MutationCtx,
  QueryCtx,
} from "../_generated/server";
import { hasAccessToOrg } from "../helpers";
import { api, internal } from "../_generated/api";
import { createClerkClient } from "@clerk/nextjs/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const BASE_URL = "https://graph.facebook.com/v19.0";

export const getPageIdsAction = action({
  args: { userId: v.string(), accessToken: v.string() },
  handler: async (ctx, args) => {
    const data = await fetch(
      `${BASE_URL}/${args.userId}/accounts?access_token=${args.accessToken}`
    );
    // do something with data
  },
});

export const getOAuthAccesToken = internalAction({
  args: { provider: v.any(), userId: v.string() },
  async handler(ctx, args) {
    const accessToken = await clerkClient.users.getUserOauthAccessToken(
      args.userId,
      args.provider
    );

    if (!accessToken) throw new ConvexError("No access token found");

    return accessToken;
  },
});

export const getPageIds = mutation({
  args: { orgId: v.string() },
  async handler(ctx, args) {
    // TODO: authenticate user
    const hasAccess = await hasAccessToOrg(ctx, args.orgId);

    if (!hasAccess) throw new ConvexError("You do not have access to this org");
    const identity = await ctx.auth.getUserIdentity();
    if (!identity)
      throw new ConvexError("You must be logged in to create an event.");

    const token = await ctx.scheduler.runAfter(
      0,
      internal.socials.facebook.getOAuthAccesToken,
      {
        userId: identity?.subject,
        provider: "oauth_facebook",
      }
    );

    console.log(token);

    // user is authenticated - Get the user's facebook id and accesscode
  },
});

// export const getPageIds = httpAction(async (ctx, req) => {
//   const { userId } = await req.json();

//   return new Response(null, { status: 200 });
// });
