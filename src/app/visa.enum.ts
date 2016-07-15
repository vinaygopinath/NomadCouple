export enum Visa {
  REQUIRED,
  NOT_REQUIRED,
  EVISA,
  ON_ARRIVAL,
  REFUSED,
  UNKNOWN
}

export module Visa {
  export function toString(visaType: Visa) {
    return Visa[visaType].toLowerCase().replace(/_/g, '-');
  }

  export function parse(visaType: string) {
    if (!visaType) {
       throw new Error('Cannot parse empty string into a Visa enum');
    }
    return Visa[visaType.toUpperCase().replace(/-/g, '_')];
  }

  export function getValues() {
        return ['required', 'not-required', 'evisa', 'on-arrival', 'refused', 'unknown'];
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
}
