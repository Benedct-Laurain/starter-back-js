import { ILike, Repository } from "typeorm";
import { getRepository } from "../index";
import Country from "../entity/Country.entity";
import CountryFixtures from "../data/countries";

export default class CountryRepository {
  private static repository: Repository<Country>;

  static async initializeRepository() {
    this.repository = await getRepository(Country);
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }

  static async initializeDataCountries(): Promise<void> {
    const countries = CountryFixtures.Countries;
    for (const country of countries) {
      await this.repository.save(country);
    }
  }

  static async getAllCountries(): Promise<Country[]> {
    return this.repository.find();
  }

  static async getCountryByName(country: string): Promise<Country> {
    const existingCountry = await this.repository.findOne({ 
      where: {
        country: ILike(`%${country}%`)
      }
    });
    if (!existingCountry) {
      throw Error("No existing Country matching Name")
    } 
    return existingCountry;
  }
}