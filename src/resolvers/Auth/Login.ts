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
    @Arg("data") { email, password }: LoginInput,
    @Ctx() ctx: ExpressContext
  ): Promise<AuthResponse> {
    const profile = await Profile.findOne({
      where: { email },
    });

    if (!profile) {
      return {
        message: "Email not found. 🤷‍♂",
        status: false,
        profile: null,
      };
    }

    if (!profile.confirmed) {
      return {
        message: "Please check your email to confirm your account. Thanks! 🎉",
        status: false,
        profile: null,
      };
    }

    const valid = await bcrypt.compare(password, profile.password);

    if (!valid) {
      return {
        message: "Password is not valid. 💀",
        status: false,
        profile: null,
      };
    }

    if (ctx.req.session) {
      ctx.req.session.profileId = profile.id;
      ctx.req.session.email = profile.email;
      ctx.req.session.artisan = profile.artisan;
    }

    console.log(ctx.req.session);

    return {
      message: "Successfully logged in. 🔥",
      status: true,
      profile: profile,
    };
  }
}
