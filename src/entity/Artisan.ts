import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Profile } from "./Profile";

@ObjectType()
@Entity()
export class Artisan extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  stripeAccountID: string;

  @Field()
  @Column("text")
  updateStripeInfoLink: string;

  @Field()
  @Column("text")
  shopName: string;

  @Field()
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
