import { Country } from './country';
import { Visa } from './visa.enum';

export class RawWikiDataJSON {
  public [Visa.REQUIRED]: { name: string; note?: string }[];
  public [Visa.NOT_REQUIRED]: { name: string; note?: string }[];
  public [Visa.EVISA]: { name: string; note?: string }[];
  public [Visa.ON_ARRIVAL]: { name: string; note?: string }[];
  public [Visa.REFUSED]: { name: string; note?: string }[];
  public [Visa.UNKNOWN]: { name: string; note?: string }[];
}

export class WikiData {

  public [Visa.REQUIRED]: Country[] = [];
  public [Visa.NOT_REQUIRED]: Country[] = [];
  public [Visa.EVISA]: Country[] = [];
  public [Visa.ON_ARRIVAL]: Country[] = [];
  public [Visa.REFUSED]: Country[] = [];
  public [Visa.UNKNOWN]: Country[] = [];

  public constructor(rawWikiDataJson: RawWikiDataJSON) {

    Visa.getKeys().forEach((visa: Visa) => {
      const countries = (rawWikiDataJson[visa] || []).map((countryJSON: { name: string; note?: string }) => new Country(countryJSON.name, countryJSON.note));
      this[visa] = countries;
    });
  }
}
