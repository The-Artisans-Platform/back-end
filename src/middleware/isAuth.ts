import { MiddlewareFn } from "type-graphql";

import { ExpressContext } from "../types";

export const isAuth: MiddlewareFn<ExpressContext> = async (
  { context },
  next
) => {
  if (!context.req.session?.userId) {
    throw new Error("User is not authenticated! 💀");
  }

  return next();
};
