import { ExpressContext } from "./../../types/index";
import { Profile } from "../../entity/Profile";
import { RegisterInput } from "../../inputs/RegisterInput";
import { logger, isAuth } from "../../middleware";
import {
  Resolver,
  UseMiddleware,
  Query,
  Mutation,
  Arg,
  Ctx,
} from "type-graphql";
import bcrypt from "bcryptjs";

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
    { email, username, password, tzAbv, tzName, artisan }: RegisterInput,
    @Ctx() ctx: ExpressContext
  ): Promise<Profile> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await Profile.create({
      username,
      email,
      password: hashedPassword,
      tzAbv,
      tzName,
      artisan,
    }).save();

    if (ctx.req.session) {
      ctx.req.session.userId = user.id;
      ctx.req.session.email = user.email;
      ctx.req.session.artisan = user.artisan;
    }

    return user;
  }
}
