import { MiddlewareFn } from "type-graphql";

import { ExpressContext } from "../types";

export const isAdmin: MiddlewareFn<ExpressContext> = async (
  { context },
  next
) => {
  if (!context.req.session?.isAdmin) {
    throw new Error("User is not an admin! 💀");
  }

  return next();
};
