import { createConfirmationUrl } from "./../../nodemailer/createConfirmationUrl";
import { Profile } from "../../entity/Profile";
import { RegisterInput } from "../../inputs/RegisterInput";
import { logger, isAuth } from "../../middleware";
import { Resolver, UseMiddleware, Query, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";
import { sendEmail } from "../../nodemailer/sendEmail";

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello(): Promise<string> {
    return "Hello, world!";
  }

  @UseMiddleware(logger)
  @Mutation(() => Profile)
  async register(
    @Arg("data")
    {
      email,
      firstName,
      lastName,
      password,
      tzAbv,
      tzName,
      artisan,
    }: RegisterInput
  ): Promise<Profile> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const profile = await Profile.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      tzAbv,
      tzName,
      artisan,
    }).save();

    await sendEmail(
      email,
      await createConfirmationUrl(profile.id),
      "Confirm your account now!"
    );

    return profile;
  }
}
