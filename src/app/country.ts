export class Country {
  public name: string;
  public note: string | undefined;

  public constructor(name: string, note: string | undefined) {
    this.name = name;
    this.note = note;
  }
}
