import { ILike, Repository } from "typeorm";
import { getRepository } from "../index";
import Country from "../entity/Country.entity";

export default class CountryRepository {
  private static repository: Repository<Country>;

  static async initializeRepository() {
    this.repository = await getRepository(Country);
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }

  static async initializeCountries(): Promise<void> {
    const france = new Country("France", "FR", "🇫🇷")
    const uk = new Country("UK", "GB", "🇬🇧")
    const spain = new Country("Espagne", "ES", "🇪🇸")
    await this.repository.save([spain, uk, france])
  }

  static async getCountryByName(countryName: string): Promise<Country> {
    const existingCountry = await this.repository.findOne({ 
      where: {
        countryName: ILike(`%${countryName}%`)
      }
    });
    if (!existingCountry) {
      throw Error("No existing Country matching Name")
    } 
    return existingCountry;
  }
}