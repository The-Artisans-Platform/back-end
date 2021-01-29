import { MiddlewareFn } from "type-graphql";

import { ExpressContext } from "apollo-server-express";

export const isAdmin: MiddlewareFn<ExpressContext> = async (
  { context },
  next
) => {
  if (!context.req.session?.artisan) {
    throw new Error("User is not an admin! 💀");
  }

  return next();
};
