import { PasswordInput } from "./PasswordInput";
import { Field, InputType } from "type-graphql";
import { DoesUsernameAlreadyExist } from "./validators/doesUsernameExist";
import { DoesEmailAlreadyExist } from "./validators/doesEmailExist";
import { IsThatReallyAnEmail } from "./validators/isThatAnEmail";
import { UsernamePresence } from "./validators/isUsernamePresent";

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @UsernamePresence({ message: "You forgot to put in a username. 😒" })
  @DoesUsernameAlreadyExist({
    message: "That username is already in use! 💩",
  })
  username: string;

  @Field({ nullable: true })
  @IsThatReallyAnEmail({
    message: "I'm not gunna lie, I don't think that's a real email. 🛑",
  })
  @DoesEmailAlreadyExist({ message: "That email is already in use! 💩" })
  email: string;

  @Field({ nullable: true })
  tzAbv: string;

  @Field({ nullable: true })
  tzName: string;

  @Field({ nullable: true })
  artisan: boolean;
}
