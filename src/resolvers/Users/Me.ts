import { ExpressContext } from "../../types";
import { Profile } from "../../entity/Profile";
import { isAuth } from "../../middleware/isAuth";
import { Resolver, UseMiddleware, Query, Ctx } from "type-graphql";

@Resolver()
export class Me {
  @UseMiddleware(isAuth)
  @Query(() => Profile, { nullable: true })
  async currentUser(
    @Ctx() ctx: ExpressContext
  ): Promise<Profile | undefined | string> {
    if (!ctx.req.session?.userId) {
      return "Please log in to get current user. 💩";
    }

    return Profile.findOne(ctx.req.session?.userId);
  }
}
