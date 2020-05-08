import { Field, InputType } from "type-graphql";
import { PasswordInput } from "./PasswordInput";
import { EmailPresence } from "./validators/isEmailPresent copy";

@InputType()
export class LoginInput extends PasswordInput {
  @Field()
  @EmailPresence({ message: "You forgot to put in a email. 😒" })
  email: string;
}
