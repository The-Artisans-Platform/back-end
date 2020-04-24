import { MiddlewareFn } from "type-graphql";

import { ExpressContext } from "../types";

export const logger: MiddlewareFn<ExpressContext> = async ({ args }, next) => {
  console.log("args: ", args);

  return next();
};
