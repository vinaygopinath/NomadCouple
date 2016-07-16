import { Country } from './country';
import { Visa } from './visa.enum';
export class WikiData {

  constructor(data: Object) {
    for (let visaType of Visa.getValues()) {
      this[visaType] = data[visaType] || [];
    }
  }
}
