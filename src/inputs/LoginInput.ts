import { Field, InputType } from "type-graphql";
import { EmailPresenceConstraint } from "./validators/isEmailPresent copy";
import { EmptyPasswordConstraint } from "./validators/isPasswordEmpty";

@InputType()
export class LoginInput {
  @Field()
  @EmailPresenceConstraint({ message: "You forgot to put in a email. 😒" })
  email: string;

  @Field()
  @EmptyPasswordConstraint({
    message: "Please enter a password to continue. 🔒",
  })
  password: string;
}
