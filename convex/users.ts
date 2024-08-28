import { query } from "./_generated/server";
import { auth } from "./auth";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userID = await auth.getUserId(ctx);

    if (!userID) {
      return null;
    }

    return await ctx.db.get(userID);
  },
});
