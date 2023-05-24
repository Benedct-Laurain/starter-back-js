import { Arg, Query, Resolver } from "type-graphql";
import Country from "../entity/Country.entity";
import CountryRepository from "../repository/Country.repository";

@Resolver(Country)
export default class CountryResolver {

  @Query(() => [Country])
  countries(): Promise<Country[]> {
    return CountryRepository.getAllCountries();
  }

  @Query(() => Country)
  countryByName(@Arg("country") country : string): Promise<Country> {
    return CountryRepository.getCountryByName(country)
  }
}