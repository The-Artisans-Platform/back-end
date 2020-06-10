import { confirmProfilePrefix } from "./../../nodemailer/prefixes";
import { Resolver, Mutation, Arg } from "type-graphql";

import { redis } from "../../redis";
import { Profile } from "../../entity/Profile";

@Resolver()
export class ConfirmAccountResolver {
  @Mutation(() => Boolean)
  async confirmAccount(@Arg("token") token: string): Promise<boolean> {
    try {
      const profileId = await redis.get(confirmProfilePrefix + token);

      if (!profileId) {
        throw new Error("The token has already been used or expired. 💀");
      }

      Profile.update({ id: profileId }, { confirmed: true });

      await redis.del(confirmProfilePrefix + token);

      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
