import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field()
  @Column("text", { unique: true })
  firstName: string;

  @Field()
  @Column("text", { unique: true })
  lastName: string;

  @Field(() => String)
  displayName(@Root() parent: Profile): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Column()
  password: string;

  @Field()
  @Column("text", { default: "Etc/UTC" })
  tzName: string;

  @Field()
  @Column("text", { default: "UTC" })
  tzAbv: string;

  @Field()
  @Column({ default: false })
  artisan: boolean;

  @Column("bool", { default: false })
  confirmed: boolean;
}
