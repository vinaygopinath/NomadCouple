import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Country } from './country';
import { WikiData } from './wiki-data';
import { VisaData } from './visa-data';
import {Observable} from 'rxjs/Rx';
import { Person } from './person.enum';
import { Visa } from './visa.enum';

@Injectable()
export class VisaService {
  private BASE_URL = 'app/shared/assets';
  private COUNTRY_URL = this.BASE_URL + '/countries/';
  private countries: Array<string>;
  private visaData: VisaData;
  private visaDataObservable: Observable<VisaData>;
  private visaDataCountries: Array<string> = ['',''];
  private observable: Observable<Array<any>>;
  private userVisas: Array<Country> = [];
  private partnerVisas: Array<Country> = [];
  constructor(private http: Http) {}

  getUrlFriendlyName(input: string): string {
    if (!input) {
      throw new Error('Invalid input - Country name cannot be undefined or null');
    } else {
      return input.toLowerCase().replace(/ /g, '_');
    }
  }

  getUserFriendlyName(input: string): string {
    if (!input) {
      throw new Error('Invalid input - Cannot format undefined/null country string');
    } else {
      let str = input.replace(/_/g, ' ');
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }

  // Credit: http://stackoverflow.com/a/36294012/293847
  getDropdownCountries(): Observable<Array<any>> {
    if (this.countries) {
      return Observable.of(this.countries);
    } else if (this.observable) {
      return this.observable;
    } else {
      this.observable = this.http.get(this.BASE_URL + '/countries.json')
      .map((res: Response) => {
        return res.json() || [];
      })
      .map(arr => {
        let countries = [];
        arr.forEach((country) => {
          countries.push(country);
        });
        return countries;
      })
      .do(countries => {
        this.countries = countries;
        this.observable = null;
      })
      .share();
      return this.observable;
    }
  }

  getVisaCountries(userCountry: string, partnerCountry: string): Observable<VisaData> {
    // console.log('getVisaCountries called with %s and %s',userCountry, partnerCountry);
    if (this.visaData && !(this.visaDataCountries[0] === userCountry && this.visaDataCountries[1] === partnerCountry)) {
      // console.log('Returning cached data');
      return Observable.of(this.visaData);
    } else if (this.visaDataObservable) {
      // console.log('Returning cached observable');
      return this.visaDataObservable;
    } else {
      // console.log('Making HTTP call');
      this.visaDataCountries[0] = userCountry;
      this.visaDataCountries[1] = partnerCountry;
      let userCountryURL = this._getCountryFileName(userCountry);
      let partnerCountryURL = this._getCountryFileName(partnerCountry);
      let userCountryHttp = this.http.get(userCountryURL).map((res: Response) => res.json());
      let partnerCountryHttp = this.http.get(partnerCountryURL).map((res: Response) => res.json());
      this.visaDataObservable = Observable.forkJoin(userCountryHttp, partnerCountryHttp)
      .map(
        data => {
          let rawUserData = data[0];
          let rawPartnerData = data[1];
          this._generateVisaStatus(Person.USER, rawUserData);
          this._generateVisaStatus(Person.PARTNER, rawPartnerData);
          return [this._getWikiData(rawUserData), this._getWikiData(rawPartnerData)];
        }
      )
      .map(
        wikiArr => this._getVisaData(wikiArr[0], wikiArr[1])
      )
      .do(visaData => {
        this.visaData = visaData;
        this.visaDataObservable = null;
      })
      .share();
      return this.visaDataObservable;
    }
  }

  getUserVisaStatus(countryName) {
    return this._getVisaStatus(Person.USER, countryName);
  }

  getPartnerVisaStatus(countryName) {
    return this._getVisaStatus(Person.PARTNER, countryName);
  }

  private _getCountryFileName(input: string): string {
    if (!input) {
      throw new Error('Invalid input - Country name cannot be undefined or null');
    } else {
      return this.COUNTRY_URL + input.toLowerCase().replace(/_/g, ' ') + '.json';
    }
  }

  private _getCountries(jsonCountries: Array<any>): Array<Country> {
    if (!jsonCountries) {
      console.error('Countries wiki data was empty');
      return new Array<Country>();
    }
    let countries: Array<Country> = [];
    jsonCountries.forEach(jsonCountry => {
      countries.push(new Country(jsonCountry.name, jsonCountry.note));
    });
    return countries;
  }

  private _getWikiData(rawWikiData): WikiData {
    if (!rawWikiData) {
      console.error('Http wiki data was empty');
      return new WikiData(undefined, undefined, undefined, undefined);
    }
    let requiredCountries: Array<Country> = this._getCountries(rawWikiData.required);
    let notRequiredCountries: Array<Country> = this._getCountries(rawWikiData['not-required']);
    let onArrivalCountries: Array<Country> = this._getCountries(rawWikiData['on-arrival']);
    let unknownCountries: Array<Country> = this._getCountries(rawWikiData.unknown);

    return new WikiData(requiredCountries, notRequiredCountries, onArrivalCountries, unknownCountries);
  }

  private _getIntersection(arr1: Array<Country>, arr2: Array<Country>): Array<Country> {
    return arr1.filter(arr1Country => {
      return arr2.filter(arr2Country => {
        return arr2Country.name === arr1Country.name;
      }).length === 1;
    });
  }

  private _getDifference(arr1: Array<Country>, arr2: Array<Country>): Array<Country> {
    return arr1.filter(arr1Country => {
      return arr2.filter(arr2Country => {
        return arr2Country.name === arr1Country.name;
      }).length === 0;
    });
  }

  private _groupByVisa(userCountries, partnerCountries) {
    return {
      both: this._getIntersection(userCountries, partnerCountries),
      userOnly: this._getDifference(userCountries, partnerCountries),
      partnerOnly: this._getDifference(partnerCountries, userCountries),
      user: userCountries,
      partner: partnerCountries
    };
  }

  private _getVisaData(userData: WikiData, partnerData: WikiData): VisaData {
    // console.log('\n\n\n\n*******\nNot required');
    let notRequiredGroups = this._groupByVisa(userData.notRequired, partnerData.notRequired);
    let requiredGroups = this._groupByVisa(userData.required, partnerData.required);
    // console.log('\n\n\n\n*******\nOn Arrival');
    let onArrivalGroups = this._groupByVisa(userData.onArrival, partnerData.onArrival);
    let unknownGroups = this._groupByVisa(userData.unknown, partnerData.unknown);
    return new VisaData(requiredGroups, notRequiredGroups, onArrivalGroups, unknownGroups);
  }

  private _generateVisaStatus(person, rawData) {
    let personType;
    if (person === Person.USER) {
      personType = 'user';
    } else if (person === Person.PARTNER ) {
      personType = 'partner';
    } else {
      throw new Error('Invalid person type in getVisaStatus. Must be partner or user');
    }
    this[personType+'Visas'] = [];
    let visaTypes = ['not-required', 'required', 'on-arrival', 'unknown'];
    visaTypes.forEach((visaType) => {
      rawData[visaType].forEach( (country) => {
        this[personType+'Visas'].push(Object.assign({}, country, {visa: visaType}));
      });
    });
  }

  private _lookupCountry(arr, countryName) {
    return arr.find(function(country) {
      return country.name === countryName;
    });
  }

  private _getVisaStatus(person, countryName) {
    let personType;
    if (person === Person.USER) {
      personType = 'user';
    } else if (person === Person.PARTNER ) {
      personType = 'partner';
    } else {
      throw new Error('Invalid person type in getVisaStatus. Must be partner or user');
    }
    let country = this._lookupCountry(this[personType+'Visas'], countryName);
    if (country) {
      return Visa.parse(country.visa);
    } else {
       console.error('Attempt to find status of invalid/unlisted country %s',countryName);
      return Visa.UNKNOWN;
    }
  }
}
