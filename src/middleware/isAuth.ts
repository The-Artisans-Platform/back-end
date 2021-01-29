import { MiddlewareFn } from "type-graphql";

import { ExpressContext } from "apollo-server-express";

export const isAuth: MiddlewareFn<ExpressContext> = async (
  { context },
  next
) => {
  if (!context.req.session?.profileId) {
    throw new Error("User is not authenticated! 💀");
  }

  return next();
};
