export enum Person {
  BOTH,
  USER,
  PARTNER
}

export module Person {
  export function toString(personType: Person) {
    return Person[personType].toLowerCase();
  }

  export function parse(personType: string) {
    if (!personType) {
      throw new Error('Cannot parse empty string to Person enum');
    }
    return Person[personType.toUpperCase()];
  }

  export function getValues() {
    return ['both', 'user', 'partner'];
  }

  export function toDescriptionString(personType: Person): string {
    switch (personType) {
      case Person.BOTH: return 'Together';
      case Person.USER: return 'You';
      case Person.PARTNER: return 'Partner';
    }
  }
}
