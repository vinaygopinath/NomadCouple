export class StringUtils {

  //Credit: http://stackoverflow.com/a/10425344/293847
  public static toCamelCase(input) {
    return input.toLowerCase().replace(/-(.)/g, function(match, group) {
        return group.toUpperCase();
    });
  }

  public static getUrlFriendlyName(input: string): string {
    if (!input) {
      throw new Error('Invalid input - Country name cannot be undefined or null');
    } else {
      return input.toLowerCase().replace(/ /g, '_');
    }
  }

  public static getUserFriendlyName(input: string): string {
    if (!input) {
      throw new Error('Invalid input - Cannot format undefined/null country string');
    } else {
      let str = input.replace(/_/g, ' ');
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
}
