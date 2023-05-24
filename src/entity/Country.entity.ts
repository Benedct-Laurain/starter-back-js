import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

//add schema with in memory db or existing schema in the db (if no existing, add directly in the db with psql, admirer... or use migrations TypeOrm)
@Entity({ schema: "example" })

//without schema
// @Entity()
@Unique(["country", "code", "flag"])
@ObjectType()
export default class Country {
  constructor(
    country: string,
    code: string,
    capital: string,
    continent: string,
    flag: string
  ) {
    this.country = country;
    this.code = code;
    this.capital = capital;
    this.continent = continent;
    this.flag = flag;
  }

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  country: string;

  @Column()
  @Field()
  code: string;

  @Column()
  @Field()
  capital: string;

  @Column()
  @Field()
  continent: string;

  @Column()
  @Field()
  flag: string;
}