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
  @PrimaryColumn("uuid")
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

  @Column()
  password: string;

  @Field()
  @Column({ default: false })
  artisan: boolean;

  @Field()
  @Column("bool", { default: false })
  confirmed: boolean;

  @Field()
  @Column("bool", { default: false })
  mailingList: boolean;

  @BeforeInsert()
  addId(): void {
    this.id = v4();
  }

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
