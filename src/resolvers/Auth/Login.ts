import { AuthResponse } from "./../../types/index";
import { logger } from "../../middleware";
import bcrypt from "bcryptjs";
import { ExpressContext } from "../../types";
import { Profile } from "../../entity/Profile";
import { LoginInput } from "../../inputs/LoginInput";
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";

@Resolver()
export class LoginResolver {
  @UseMiddleware(logger)
  @Mutation(() => AuthResponse)
  async login(
    @Arg("data") { username, password }: LoginInput,
    @Ctx() ctx: ExpressContext
  ): Promise<AuthResponse> {
    const user = await Profile.findOne({
      where: { username },
    });

    if (!user) {
      return {
        message: "Username not found. 🤷‍♂",
        status: false,
        user: null,
      };
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return {
        message: "Password is not valid. 💀",
        status: false,
        user: null,
      };
    }

    if (ctx.req.session) {
      ctx.req.session.userId = user.id;
      ctx.req.session.email = user.email;
      ctx.req.session.artisan = user.artisan;
    }

    console.log(ctx.req.session);

    return {
      message: "Successfully logged in. 🔥",
      status: true,
      user: user,
    };
  }
}
