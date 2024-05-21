import { ConvexError, v } from "convex/values";
import { internalMutation, MutationCtx, QueryCtx } from "./_generated/server";

export async function getUser(
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string
) {
  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", tokenIdentifier)
    )
    .first();

  if (!user) throw new ConvexError("exptected user to be defined.");

  return user;
}

export const createUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    name: v.string(),
    email: v.string(),
    profileImg: v.optional(v.string()),
  },
  async handler(ctx, args) {
    await ctx.db.insert("users", {
      tokenIdentifier: args.tokenIdentifier,
      name: args.name,
      email: args.email,
      profileImg: args.profileImg,
      orgIds: [],
    });
  },
});

export const updateUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    name: v.string(),
    email: v.string(),
    profileImg: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const user = await getUser(ctx, args.tokenIdentifier);

    await ctx.db.patch(user._id, {
      tokenIdentifier: args.tokenIdentifier,
      name: args.name,
      email: args.email,
      profileImg: args.profileImg,
    });
  },
});

export const addOrgIdToUser = internalMutation({
  args: { tokenIdentifier: v.string(), orgId: v.string() },
  async handler(ctx, args) {
    const user = await getUser(ctx, args.tokenIdentifier);

    await ctx.db.patch(user._id, {
      tokenIdentifier: args.tokenIdentifier,
      orgIds: [...user.orgIds, args.orgId],
    });
  },
});

// // TODO: Change how users are stored in convex to contain email/name/etc
// export const getOrgNameByIdAction = action({
//   args: { orgId: v.string() },
//   async handler(_, args) {
//     const name = await clerkClient.organizations.getOrganization({
//       organizationId: args.orgId,
//     });

//     return name;
//   },
// });
