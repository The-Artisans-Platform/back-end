import { PasswordInput } from "./PasswordInput";

import { Field, InputType } from "type-graphql";

@InputType()
export class ChangePasswordInput extends PasswordInput {
  @Field()
  confirmPassword: string;

  @Field()
  token: string;
}
