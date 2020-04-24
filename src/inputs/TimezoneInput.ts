import { Field, InputType } from "type-graphql";

@InputType()
export class TimezoneInput {
  @Field()
  tzName: string;

  @Field()
  tzAbv: string;
}
