import { createConfirmationUrl } from "./../../nodemailer/createConfirmationUrl";
import { Profile } from "../../entity/Profile";
import { Resolver, Query, Arg } from "type-graphql";
import { sendEmail } from "../../nodemailer/sendEmail";

@Resolver()
export class ResendEmailVerificationResolver {
  @Query(() => String)
  async resendEmailVerification(@Arg("email") email: string): Promise<string> {
    const profile = await Profile.findOne({
      where: {
        email: email,
      },
    });
    if (profile) {
      sendEmail(
        email,
        await createConfirmationUrl(profile.id),
        "Here's your knew confirmation link!"
      );
      return "Verification email has been sent. ✉️";
    }

    return "Sorry, there is currently no account associated with that email. 🤷‍♂";
  }
}
