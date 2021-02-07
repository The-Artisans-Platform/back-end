import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  BeforeInsert,
} from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";
import { v4 } from "uuid";
import bcrypt from "bcryptjs";

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn("text")
  id: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field()
  @Column("text")
  firstName: string;

  @Field()
  @Column("text")
  lastName: string;

  @Field(() => String)
  displayName(@Root() parent: Profile): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Column({ nullable: true })
  password: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  avatar: string;

  @Field()
  @Column({ default: "user" })
  role: "user" | "artisan" | "admin";

  @Field()
  @Column("bool", { default: false })
  confirmed: boolean;

  @Field()
  @Column("bool", { default: false })
  mailingList: boolean;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  stripeAccountID: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  updateStripeInfoLink: string;

  @BeforeInsert()
  addId(): void {
    this.id = v4();
  }

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }
}
