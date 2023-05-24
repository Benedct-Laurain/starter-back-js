import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

//add schema with in memory db or existing schema in the db (if no existing, add directly in the db with psql, admirer... or use migrations TypeOrm)
@Entity({ schema: "example" })

//without schema
// @Entity()
@Unique(["countryName", "code", "emoji"])
@ObjectType()
export default class Country {
  constructor(
    countryName: string,
    code: string,
    emoji: string
  ) {
    this.countryName = countryName;
    this.code = code;
    this.emoji = emoji;
  }
  
  @PrimaryGeneratedColumn("uuid")
  @Field(type => ID)
  id: string;

  @Column()
  @Field()
  countryName: string;

  @Column()
  @Field({ nullable: true })
  code: string;

  @Column()
  @Field()
  emoji: string;
}