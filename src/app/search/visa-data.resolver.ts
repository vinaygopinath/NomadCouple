import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MetaService } from 'ng2-meta';
import { Observable } from 'rxjs/Observable';

import { VisaService } from '../visa.service';
import { VisaData } from '../visa-data';
import { StringUtils } from '../utils/string';
import { Country } from '../country';

@Injectable()
export class VisaDataResolver implements Resolve<VisaData> {

  public constructor(private visaService: VisaService, private metaService: MetaService) {
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<VisaData> {
    const userNationality = StringUtils.getUserFriendlyName(route.paramMap.get('userNationality'));
    const partnerNationality = StringUtils.getUserFriendlyName(route.paramMap.get('partnerNationality'));

    return this.visaService.getVisaData(userNationality, partnerNationality)
      .do((visaData: VisaData) => this._setMetaTags(visaData, userNationality, partnerNationality));
  }

  private _getCountryNamesForMeta(countries: Country[]): string | null {
    if (!countries || !countries.length) {
      return null;
    }

    if (countries.length === 3) {
      return `${countries[0].name}, ${countries[1].name}, and ${countries[2].name}`;
    } else if (countries.length === 2) {
      return `${countries[0].name} and ${countries[1].name}`;
    } else {
      const countryNames: string[] = [];
      while (countryNames.length < 3) {
        const randomCountry = countries[Math.floor(Math.random() * countries.length)].name;
        if (countryNames.includes(randomCountry)) {
          continue;
        }
        countryNames.push(randomCountry);
      }

      return `${countryNames[0]}, ${countryNames[1]}, and ${countryNames[2]}`;
    }
  }

  private _setMetaTags(visaData: VisaData, userNationality: string, partnerNationality: string) {
    this.metaService.setTitle(`${userNationality} and ${partnerNationality} - Visa requirements`);
    const bothNotRequiredCountryNames = this._getCountryNamesForMeta(visaData.bothNotRequired);
    const bothOnArrivalCountryNames = this._getCountryNamesForMeta(visaData.bothOnArrival);
    const bothNotRequiredExamples = bothNotRequiredCountryNames ? ` (including ${bothNotRequiredCountryNames})` : '';
    const bothOnArrivalExamples = bothOnArrivalCountryNames ? ` (including ${bothOnArrivalCountryNames})` : '';
    const descriptionText = `Couples from ${userNationality} and ${partnerNationality} \
can travel to ${visaData.bothNotRequired.length} countries visa-free/without a visa${bothNotRequiredExamples} and ${visaData.bothOnArrival.length} \
countries with visa on arrival${bothOnArrivalExamples}. Find out more and plan your travel together!`;
    this.metaService.setTag('description', descriptionText);
  }
}
