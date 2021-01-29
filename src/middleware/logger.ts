import { MiddlewareFn } from "type-graphql";

import { ExpressContext } from "apollo-server-express";

export const logger: MiddlewareFn<ExpressContext> = async ({ args }, next) => {
  // only log on dev and staging environments
  if (process.env.NODE_ENV !== "production") {
    console.log("args: ", args);
  }

  return next();
};
