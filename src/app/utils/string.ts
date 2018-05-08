export class StringUtils {

  public static getUrlFriendlyName(input: string): string {
    if (!input) {
      throw new Error('Invalid input - Country name cannot be undefined or null');
    } else {
      return input.toLowerCase().replace(/ /g, '_');
    }
  }

  public static getUserFriendlyName(input: string | null): string {
    if (!input) {
      throw new Error('Invalid input - Cannot format undefined/null country string');
    } else {
      const str = input.replace(/_/g, ' ');

      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }

  public static getWikiUrl(country: string): string {
    if (!country) {
      throw new Error('Invalid country - Cannot generate wiki URL for undefined/null country');
    } else {
      const str = country.replace(/ /g, '_');

      return 'https://en.wikivoyage.org/wiki/' + str;
    }
  }
}
