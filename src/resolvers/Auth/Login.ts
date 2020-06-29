// import { AuthResponse } from "./../../types/index";
import { setSession } from "./helpers/index";
import { logger } from "../../middleware";
import { ExpressContext } from "../../types";
import { Profile } from "../../entity/Profile";
import { LoginInput } from "../../inputs/LoginInput";
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import bcrypt from "bcryptjs";

@Resolver()
export class LoginResolver {
  @UseMiddleware(logger)
  @Mutation(() => Profile)
  async login(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() ctx: ExpressContext
  ): Promise<Profile> {
    try {
      const profile = await Profile.findOne({
        where: { email },
      });

      if (!profile) {
        throw new Error("Email not found. 🤷‍♂");
      }

      // if (!profile.confirmed) {
      //   throw new Error(
      //     "Please check your email to confirm your account. Thanks! 👀"
      //   );
      // }

      const valid = await bcrypt.compare(password, profile.password);

      if (!valid) {
        throw new Error("Password is not valid. 💀");
      }

      setSession(ctx, profile);

      console.log(ctx.req.session);

      return profile;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
