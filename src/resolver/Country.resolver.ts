import { Arg, Query, Resolver } from "type-graphql";
import Country from "../entity/Country.entity";
import CountryRepository from "../repository/Country.repository";

@Resolver(Country)
export default class CountryResolver {
  @Query(() => Country)
  countryByName(@Arg("countryName") countryName : string): Promise<Country> {
    return CountryRepository.getCountryByName(countryName)
  }
}