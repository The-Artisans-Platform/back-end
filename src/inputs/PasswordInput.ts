import { Field, InputType } from "type-graphql";
import { PasswordLength } from "./validators/passwordValidation";

@InputType()
export class PasswordInput {
  @Field()
  @PasswordLength({
    message: "Passwords must be at least 6 character long. 💪",
  })
  password: string;
}
