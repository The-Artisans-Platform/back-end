import { ExpressContext } from "apollo-server-express";
import { setSession } from "./helpers";
import { createConfirmationUrl } from "./../../nodemailer/createConfirmationUrl";
import { Profile } from "../../entity/Profile";
import { RegisterInput } from "../../inputs/RegisterInput";
import { logger } from "../../middleware";
import {
  Resolver,
  UseMiddleware,
  Query,
  Mutation,
  Arg,
  Ctx,
} from "type-graphql";
import { sendEmail } from "../../nodemailer/sendEmail";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return "Hello, world!";
  }

  @UseMiddleware(logger)
  @Mutation(() => Profile)
  async register(
    @Arg("data")
    { email, firstName, lastName, password, mailingList }: RegisterInput,
    @Ctx() ctx: ExpressContext
  ): Promise<Profile> {
    const profile = await Profile.create({
      firstName,
      lastName,
      email,
      password,
      mailingList,
    }).save();

    setSession(ctx, profile);

    await sendEmail(
      email,
      await createConfirmationUrl(profile.id),
      "Confirm your account now!"
    );

    return profile;
  }
}
