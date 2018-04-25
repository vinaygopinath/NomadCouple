export enum Visa {
  REQUIRED = 'required',
  NOT_REQUIRED = 'notRequired',
  EVISA = 'evisa',
  ON_ARRIVAL = 'onArrival',
  REFUSED = 'refused',
  UNKNOWN = 'unknown'
}

export module Visa {

  export function parse(visaType: string) {
    if (!visaType) {
      throw new Error('Cannot parse empty string into a Visa enum');
    }

    switch (visaType) {
      case 'required': return Visa.REQUIRED;
      case 'notRequired': return Visa.NOT_REQUIRED;
      case 'evisa': return Visa.EVISA;
      case 'onArrival': return Visa.ON_ARRIVAL;
      case 'refused': return Visa.REFUSED;
      case 'unknown': return Visa.UNKNOWN;
      default:
        throw new Error(`Unknown visa type string: ${visaType}`);
    }
  }

  export function getValues() {
    return ['required', 'notRequired', 'evisa', 'onArrival', 'refused', 'unknown'];
  }

  export function getKeys(): Visa[] {
    return [Visa.REQUIRED, Visa.NOT_REQUIRED, Visa.EVISA, Visa.ON_ARRIVAL, Visa.REFUSED, Visa.UNKNOWN];
  }

  export function toDescriptionString(visaType: Visa) {
    switch (visaType) {
      case Visa.REQUIRED: return 'Visa required';
      case Visa.NOT_REQUIRED: return 'Visa not required';
      case Visa.EVISA: return 'Electronic visa';
      case Visa.ON_ARRIVAL: return 'Visa on arrival';
      case Visa.REFUSED: return 'Travel banned/admission refused';
      case Visa.UNKNOWN: return 'Visa status unknown. Please report a bug';
    }
  }

  export function toCSSClass(visaType: Visa): string {
    switch (visaType) {
      case Visa.REQUIRED:
      case Visa.REFUSED:
      case Visa.UNKNOWN:
      case Visa.EVISA:
        return <string>visaType;

      case Visa.NOT_REQUIRED:
        return 'not-required';
      case Visa.ON_ARRIVAL:
        return 'on-arrival';

      default:
        throw new Error(`Unknown visa type string: ${visaType}`);
    }
  }
}
