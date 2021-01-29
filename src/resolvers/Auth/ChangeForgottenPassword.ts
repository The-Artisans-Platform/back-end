import { setSession } from "./helpers/index";
import { ExpressContext } from "apollo-server-express";
import { Profile } from "entity/Profile";
import { ChangePasswordInput } from "inputs/ChangePasswordInput";
import { redis } from "redis";
import { forgotPasswordPrefix } from "nodemailer/prefixes";
import { logger } from "middleware/logger";
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";

@Resolver()
export class ChangeForgottenPasswordResolver {
  @UseMiddleware(logger)
  @Mutation(() => String)
  async changeForgottenPassword(
    @Arg("data")
    { token, password, confirmPassword }: ChangePasswordInput,
    @Ctx() ctx: ExpressContext
  ): Promise<string> {
    try {
      const profileId = await redis.get(forgotPasswordPrefix + token);

      const profile = await Profile.findOne({ where: { id: profileId } });

      if (!profile) {
        throw new Error("Token has expired. 💀");
      }

      if (password.length < 6) {
        throw new Error("Password is too short. 🤷‍♂");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match. 😤");
      }

      redis.del(forgotPasswordPrefix + token);

      profile.save();

      setSession(ctx, profile);

      return "Password successfully changed! 🔥";
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
