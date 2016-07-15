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
}
