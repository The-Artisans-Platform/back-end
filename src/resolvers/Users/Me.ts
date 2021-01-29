import { ExpressContext } from "apollo-server-express";
import { Profile } from "../../entity/Profile";
import { isAuth } from "../../middleware/isAuth";
import { Resolver, UseMiddleware, Query, Ctx } from "type-graphql";

@Resolver()
export class Me {
  @UseMiddleware(isAuth)
  @Query(() => Profile, { nullable: true })
  async me(@Ctx() ctx: ExpressContext): Promise<Profile | undefined | string> {
    return Profile.findOne(ctx.req.session?.profileId);
  }
}
