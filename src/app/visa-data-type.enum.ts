import { Person } from './person.enum';
import { Visa } from './visa.enum';

export enum VisaDataType {
  BOTH_REQUIRED = 'bothRequired',
  BOTH_NOT_REQUIRED = 'bothNotRequired',
  BOTH_EVISA = 'bothEvisa',
  BOTH_ON_ARRIVAL = 'bothOnArrival',
  BOTH_REFUSED = 'bothRefused',
  BOTH_UNKNOWN = 'bothUnknown',

  PARTNER_REQUIRED = 'partnerRequired',
  PARTNER_NOT_REQUIRED = 'partnerNotRequired',
  PARTNER_EVISA = 'partnerEvisa',
  PARTNER_ON_ARRIVAL = 'partnerOnArrival',
  PARTNER_REFUSED = 'partnerRefused',
  PARTNER_UNKNOWN = 'partnerUnknown',

  USER_REQUIRED = 'userRequired',
  USER_NOT_REQUIRED = 'userNotRequired',
  USER_EVISA = 'userEvisa',
  USER_ON_ARRIVAL = 'userOnArrival',
  USER_REFUSED = 'userRefused',
  USER_UNKNOWN = 'userUnknown'
}

export module VisaDataType {

  export function getKeys(): VisaDataType[] {
    return [VisaDataType.BOTH_REQUIRED, VisaDataType.BOTH_NOT_REQUIRED, VisaDataType.BOTH_EVISA, VisaDataType.BOTH_ON_ARRIVAL, VisaDataType.BOTH_REFUSED, VisaDataType.BOTH_UNKNOWN,
    VisaDataType.USER_REQUIRED, VisaDataType.USER_NOT_REQUIRED, VisaDataType.USER_EVISA, VisaDataType.USER_ON_ARRIVAL, VisaDataType.USER_REFUSED, VisaDataType.USER_UNKNOWN,
    VisaDataType.PARTNER_REQUIRED, VisaDataType.PARTNER_NOT_REQUIRED, VisaDataType.PARTNER_EVISA, VisaDataType.PARTNER_ON_ARRIVAL, VisaDataType.PARTNER_REFUSED, VisaDataType.PARTNER_UNKNOWN];
  }

  function getBothVisaType(visa: Visa) {
    switch (visa) {
      case Visa.REQUIRED: return VisaDataType.BOTH_REQUIRED;
      case Visa.NOT_REQUIRED: return VisaDataType.BOTH_NOT_REQUIRED;
      case Visa.EVISA: return VisaDataType.BOTH_EVISA;
      case Visa.ON_ARRIVAL: return VisaDataType.BOTH_ON_ARRIVAL;
      case Visa.REFUSED: return VisaDataType.BOTH_REFUSED;
      case Visa.UNKNOWN: return VisaDataType.BOTH_UNKNOWN;
    }
  }

  function getUserOrPartnerVisaType(visa: Visa, isUser: boolean) {
    switch (visa) {
      case Visa.REQUIRED: return isUser ? VisaDataType.USER_REQUIRED : VisaDataType.PARTNER_REQUIRED;
      case Visa.NOT_REQUIRED: return isUser ? VisaDataType.USER_NOT_REQUIRED : VisaDataType.PARTNER_NOT_REQUIRED;
      case Visa.EVISA: return isUser ? VisaDataType.USER_EVISA : VisaDataType.PARTNER_EVISA;
      case Visa.ON_ARRIVAL: return isUser ? VisaDataType.USER_ON_ARRIVAL : VisaDataType.PARTNER_ON_ARRIVAL;
      case Visa.REFUSED: return isUser ? VisaDataType.USER_REFUSED : VisaDataType.PARTNER_REFUSED;
      case Visa.UNKNOWN: return isUser ? VisaDataType.USER_UNKNOWN : VisaDataType.PARTNER_UNKNOWN;
    }
  }

  export function getType(person: Person, visa: Visa): VisaDataType {
    switch (person) {
      case Person.BOTH:
        return getBothVisaType(visa);
      case Person.USER:
      case Person.PARTNER:
        return getUserOrPartnerVisaType(visa, person === Person.USER);
    }

    throw new Error(`Unknown/missing person "${person}" or visa type ${visa}`);
  }
}
