export enum Person {
  BOTH = 'both',
  USER = 'user',
  PARTNER = 'partner'
}

export module Person {

  export function parse(personType: string): Person {
    if (!personType) {
      throw new Error('Cannot parse empty string to Person enum');
    }

    switch (personType) {
      case 'both': return Person.BOTH;
      case 'user': return Person.USER;
      case 'partner': return Person.PARTNER;
      default:
        throw new Error(`Unknown person type string: "${personType}"`);
    }
  }

  export function getValues() {
    return ['both', 'user', 'partner'];
  }

  export function getKeys(): Person[] {
    return [Person.BOTH, Person.USER, Person.PARTNER];
  }

  export function toDescriptionString(personType: Person): string {
    switch (personType) {
      case Person.BOTH: return 'Together';
      case Person.USER: return 'You';
      case Person.PARTNER: return 'Partner';
    }
  }
}
