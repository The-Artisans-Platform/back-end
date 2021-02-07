import { ExpressContext } from "apollo-server-express";
import { Profile } from "./../../../entity/Profile";

export const setSession = (ctx: ExpressContext, profile: Profile): void => {
  if (ctx.req.session) {
    ctx.req.session.profileId = profile.id;
    ctx.req.session.email = profile.email;
    ctx.req.session.role = profile.role;
  }
};
