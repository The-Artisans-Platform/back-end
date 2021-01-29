import { ExpressContext } from "apollo-server-express";
import { logger } from "../../middleware";
import { Resolver, Mutation, UseMiddleware, Ctx } from "type-graphql";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(logger)
  async logout(@Ctx() ctx: ExpressContext): Promise<boolean> {
    return new Promise((res, rej) =>
      ctx.req.session?.destroy((err) => {
        if (err) {
          console.log("Logout error: ", err);
          return rej(false);
        }

        ctx.res?.clearCookie("qid");
        return res(true);
      })
    );
  }
}
