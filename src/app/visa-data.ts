import { Country } from './country';
import { Visa } from './visa.enum';
import { Person } from './person.enum';
import { VisaDataType } from './visa-data-type.enum';

class CountryGroupPerPerson {
  public both: Country[];
  public user: Country[];
  public partner: Country[];
}

export class RawVisaDataJSON {
  public [Visa.REQUIRED]: CountryGroupPerPerson;
  public [Visa.NOT_REQUIRED]: CountryGroupPerPerson;
  public [Visa.ON_ARRIVAL]: CountryGroupPerPerson;
  public [Visa.EVISA]: CountryGroupPerPerson;
  public [Visa.REFUSED]: CountryGroupPerPerson;
  public [Visa.UNKNOWN]: CountryGroupPerPerson;
}

export class VisaData {

  public [VisaDataType.BOTH_REQUIRED]: Country[];
  public [VisaDataType.BOTH_NOT_REQUIRED]: Country[];
  public [VisaDataType.BOTH_EVISA]: Country[];
  public [VisaDataType.BOTH_ON_ARRIVAL]: Country[];
  public [VisaDataType.BOTH_REFUSED]: Country[];
  public [VisaDataType.BOTH_UNKNOWN]: Country[];

  public [VisaDataType.PARTNER_REQUIRED]: Country[];
  public [VisaDataType.PARTNER_NOT_REQUIRED]: Country[];
  public [VisaDataType.PARTNER_EVISA]: Country[];
  public [VisaDataType.PARTNER_ON_ARRIVAL]: Country[];
  public [VisaDataType.PARTNER_REFUSED]: Country[];
  public [VisaDataType.PARTNER_UNKNOWN]: Country[];

  public [VisaDataType.USER_REQUIRED]: Country[];
  public [VisaDataType.USER_NOT_REQUIRED]: Country[];
  public [VisaDataType.USER_EVISA]: Country[];
  public [VisaDataType.USER_ON_ARRIVAL]: Country[];
  public [VisaDataType.USER_REFUSED]: Country[];
  public [VisaDataType.USER_UNKNOWN]: Country[];

  public constructor(data: RawVisaDataJSON) {

    Visa.getKeys().forEach((visa: Visa) => {
      Person.getKeys().forEach((person: Person) => {
        const visaDataType = VisaDataType.getType(person, visa);
        this[visaDataType] = data[visa][person];
      });
    });
  }
}
