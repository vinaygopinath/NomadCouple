import { Country } from './country';
import { Visa } from './visa.enum';
import { Person } from './person.enum';
import { StringUtils } from './utils/string';

export class VisaData {

  bothNotRequired: Array<Country>;

  constructor(data) {
    for (let visaType of Visa.getValues()) {
      for (let personType of Person.getValues()) {
        this[StringUtils.toCamelCase(personType+'-'+visaType)] = data[visaType][personType];
      }
      // this[StringUtils.toCamelCase('only-user-'+visaType)] = data[visaType].userOnly;
      // this[StringUtils.toCamelCase('only-partner-'+visaType)] = data[visaType].partnerOnly;
    }
  }
}
