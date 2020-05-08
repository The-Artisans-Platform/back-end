import { ChangePasswordInput } from "./../../inputs/ChangePasswordInput";
import { redis } from "./../../redis";
import { forgotPasswordPrefix } from "./../../nodemailer/prefixes";
import { logger } from "./../../middleware/logger";
import { ExpressContext, ApiResponse } from "./../../types/index";
import bcrypt from "bcryptjs";
import { Profile } from "../../entity/Profile";
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";

@Resolver()
export class ChangeForgottenPasswordResolver {
  @UseMiddleware(logger)
  @Mutation(() => ApiResponse, { nullable: true })
  async changeForgottenPassword(
    @Arg("data")
    { token, password }: ChangePasswordInput,
    @Ctx() ctx: ExpressContext
  ): Promise<ApiResponse> {
    const profileId = await redis.get(forgotPasswordPrefix + token);

    const profile = await Profile.findOne({ where: { id: profileId } });

    if (!profile) {
      return {
        message: "Token has expired. 💀",
        status: false,
      };
    }

    if (password.length < 6) {
      return {
        message: "Password is too short. 🕹",
        status: false,
      };
    } else {
      profile.password = await bcrypt.hash(password, 12);

      await redis.del(forgotPasswordPrefix + token);

      await profile.save();

      if (ctx.req.session) {
        ctx.req.session.profileId = profile.id;
        ctx.req.session.email = profile.email;
        ctx.req.session.artisan = profile.artisan;
      }

      return {
        message: "Password successfully changed! 🔥",
        status: true,
      };
    }
  }
}
