import { ExpressContext } from "apollo-server-express";
import { Resolver, Query, Ctx } from "type-graphql";

@Resolver()
export class IsLoggedInResolver {
  @Query(() => Boolean)
  async isLoggedIn(@Ctx() ctx: ExpressContext): Promise<boolean> {
    try {
      if (ctx.req.session?.profileId) {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
