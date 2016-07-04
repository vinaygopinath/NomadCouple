import { Country } from './country';

export class WikiData {

  required: Array<Country>;
  notRequired: Array<Country>;
  onArrival: Array<Country>;
  unknown: Array<Country>;

  constructor(required: Array<Country>, notRequired: Array<Country>, onArrival: Array<Country>, unknown: Array<Country>) {
    this.required = required || [];
    this.notRequired = notRequired || [];
    this.onArrival = onArrival || [];
    this.unknown = unknown || [];
  }
}
