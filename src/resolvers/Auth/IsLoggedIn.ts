import { ExpressContext } from "../../types";
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
