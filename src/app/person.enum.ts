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
}
