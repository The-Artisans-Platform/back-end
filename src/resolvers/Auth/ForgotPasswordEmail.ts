import { Profile } from "../../entity/Profile";
import { forgotPasswordPrefix } from "../../nodemailer/prefixes";
import { redis } from "../../redis";
import { Resolver, Mutation, Arg } from "type-graphql";
import { v4 } from "uuid";
import { sendEmail } from "../../nodemailer/sendEmail";

require("dotenv").config();

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => String)
  async forgotPassword(@Arg("email") email: string): Promise<string> {
    const user = await Profile.findOne({
      where: { email: email },
    });

    if (!user) {
      return "Email was not found. 🤷‍♂";
    }

    const token = v4();
    await redis.set(forgotPasswordPrefix + token, user.id, "ex", 60 * 60 * 24); // 1 day expiration

    await sendEmail(
      email,
      `${process.env.FRONT_END_URL}user/forgot-password/${token}`
    );

    return "Email has been sent! Please click on the link sent to you to change your password. 📫";
  }
}
