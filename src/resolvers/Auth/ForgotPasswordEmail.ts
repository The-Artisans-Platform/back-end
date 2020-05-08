import { Profile } from "../../entity/Profile";
import { forgotPasswordPrefix } from "../../nodemailer/prefixes";
import { redis } from "../../redis";
import { Resolver, Mutation, Arg } from "type-graphql";
import { v4 } from "uuid";
import { sendEmail } from "../../nodemailer/sendEmail";
import { createForgotPasswordUrl } from "../../nodemailer/createForgotPasswordUrl";

require("dotenv").config();

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => String)
  async forgotPassword(@Arg("email") email: string): Promise<string> {
    try {
      const profile = await Profile.findOne({
        where: { email: email },
      });

      if (!profile) {
        throw new Error("Email was not found. 🤷‍♂");
      }

      const token = v4();
      await redis.set(
        forgotPasswordPrefix + token,
        profile.id,
        "ex",
        60 * 60 * 24
      ); // 1 day expiration

      await sendEmail(
        email,
        await createForgotPasswordUrl(profile.id),
        // `${process.env.FRONT_END_URL}protected/forgot-password/${token}`,
        "Forgot your password?"
      );

      return "Email has been sent! Please click on the link sent to you to change your password. 📫";
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
