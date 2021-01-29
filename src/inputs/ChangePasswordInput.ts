import { Field, InputType } from "type-graphql";
import { EmptyPasswordConstraint } from "./validators/isPasswordEmpty";
import { PasswordLengthConstraint } from "./validators/isPasswordLongEnough";

@InputType()
export class ChangePasswordInput {
  @Field()
  confirmPassword: string;

  @Field()
  token: string;

  @Field()
  @EmptyPasswordConstraint({
    message: "Please enter a password to continue. 🔒",
  })
  @PasswordLengthConstraint({
    message: "Passwords must be at least 6 character long. 💪",
  })
  password: string;
}
