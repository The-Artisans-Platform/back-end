import { Profile } from "./../../../entity/Profile";
import { ExpressContext } from "./../../../types/index";

export const setSession = (ctx: ExpressContext, profile: Profile): void => {
  if (ctx.req.session) {
    ctx.req.session.profileId = profile.id;
    ctx.req.session.email = profile.email;
    ctx.req.session.artisan = profile.artisan;
  }
};
