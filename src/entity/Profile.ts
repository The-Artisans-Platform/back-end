import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

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
  username: string;

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
}
