import { Field, InputType } from "type-graphql";
import { DoesEmailAlreadyExistConstraint } from "./validators/doesEmailAlreadyExist";
import { IsThatReallyAnEmailConstraint } from "./validators/isThatAnEmail";
import { FirstNamePresenceConstraint } from "./validators/isFirstNamePresent";
import { LastNamePresenceConstraint } from "./validators/isLastNamePresent";
import { EmptyPasswordConstraint } from "./validators/isPasswordEmpty";
import { PasswordLengthConstraint } from "./validators/isPasswordLongEnough";

@InputType()
export class RegisterInput {
  @Field()
  @FirstNamePresenceConstraint({
    message: "You forgot to put in your first name. 😒",
  })
  firstName: string;

  @Field()
  @LastNamePresenceConstraint({
    message: "You forgot to put in your last name. 😒",
  })
  lastName: string;

  @Field()
  @IsThatReallyAnEmailConstraint({
    message: "That's not a real email. 🛑",
  })
  @DoesEmailAlreadyExistConstraint({
    message: "That email is already in use! 💩",
  })
  email: string;

  @Field()
  @EmptyPasswordConstraint({
    message: "Please enter a password to continue. 🔒",
  })
  @PasswordLengthConstraint({
    message: "Passwords must be at least 6 character long. 💪",
  })
  password: string;

  @Field({ nullable: true })
  mailingList: boolean;
}
