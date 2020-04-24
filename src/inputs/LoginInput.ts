import { Field, InputType } from 'type-graphql';
import { PasswordInput } from './PasswordInput';
import { UsernamePresence } from './validators/isUsernamePresent';

@InputType()
export class LoginInput extends PasswordInput {
  @Field()
  @UsernamePresence({ message: 'You forgot to put in a username. 😒' })
  username: string;
}
