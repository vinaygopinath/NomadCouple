import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Country } from './country';
import { WikiData, RawWikiDataJSON } from './wiki-data';
import { VisaData, RawVisaDataJSON } from './visa-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import { Person } from './person.enum';
import { Visa } from './visa.enum';

class CountryWithVisa extends Country {
  public visa: string;

  public constructor(name: string, note: string | undefined, visa: string) {
    super(name, note);
    this.visa = visa;
  }
}

class CountryGroupPerPerson {
  public both: Country[];
  public user: Country[];
  public partner: Country[];
}

@Injectable()
export class VisaService {

  public constructor(private http: Http) { }

  private BASE_URL = 'assets';
  private COUNTRY_URL = this.BASE_URL + '/countries/';
  private countries: string[];
  private visaData: VisaData;
  private visaDataObservable: Observable<VisaData> | null;
  private userCountry: string;
  private partnerCountry: string;
  private observable: Observable<string[]> | null;
  private userVisas: CountryWithVisa[] = [];
  private partnerVisas: CountryWithVisa[] = [];

  // Credit: http://stackoverflow.com/a/36294012/293847
  public getDropdownCountries(): Observable<string[]> {
    if (this.countries) {
      return Observable.of(this.countries);
    } else if (this.observable) {
      return this.observable;
    } else {
      this.observable = (<any>this.http.get(this.BASE_URL + '/countries.json'))
        .map((res: Response): string[] => {
          return res.json() || [];
        })
        .do((countries: string[]): string[] => {
          this.countries = countries;
          this.observable = null;

          return this.countries;
        })
        .share();

      return this.observable as Observable<string[]>;
    }
  }

  public getVisaCountries(userCountry: string, partnerCountry: string): Observable<VisaData> {
    // console.log('getVisaCountries called with %s and %s', userCountry, partnerCountry);
    if (this.visaData && (this.userCountry === userCountry && this.partnerCountry === partnerCountry)) {
      // console.log('Returning cached data');
      return Observable.of(this.visaData);
    } else if (this.visaDataObservable) {
      // console.log('Returning cached observable');
      return this.visaDataObservable;
    } else {
      this.userCountry = userCountry;
      this.partnerCountry = partnerCountry;
      const userCountryURL = this._getCountryURL(userCountry);
      const partnerCountryURL = this._getCountryURL(partnerCountry);
      const userCountryHttp: Observable<RawWikiDataJSON> = (<any>this.http.get(userCountryURL)).map((res: Response) => res.json()) as Observable<RawWikiDataJSON>;
      const partnerCountryHttp = (<any>this.http.get(partnerCountryURL)).map((res: Response) => res.json());
      this.visaDataObservable = (<any>Observable.forkJoin(userCountryHttp, partnerCountryHttp))
        .map(
          (data: RawWikiDataJSON[]) => {
            const [rawUserData, rawPartnerData] = data;
            this.userVisas = this._getCountriesWithVisa(rawUserData);
            this.partnerVisas = this._getCountriesWithVisa(rawPartnerData);

            return [new WikiData(rawUserData), new WikiData(rawPartnerData)];
          }
        )
        .map(
          (wikiArr: WikiData[]) => this._getVisaData(wikiArr[0], wikiArr[1])
        )
        .do((visaData: VisaData) => {
          this.visaData = visaData;
          this.visaDataObservable = null;

          return this.visaData;
        })
        .share();

      return this.visaDataObservable as Observable<VisaData>;
    }
  }

  public getUserVisaStatus(countryName: string) {
    return this._getVisaStatus(Person.USER, countryName);
  }

  public getPartnerVisaStatus(countryName: string) {
    return this._getVisaStatus(Person.PARTNER, countryName);
  }

  private _getCountryURL(countryName: string): string {
    if (!countryName) {
      throw new Error('Invalid input - Country name cannot be undefined or null');
    } else {
      return `${this.COUNTRY_URL}${countryName.toLowerCase().replace(/_/g, ' ')}.json`;
    }
  }

  private _getIntersection(arr1: Country[], arr2: Country[]): Country[] {
    return arr1.filter(arr1Country => {
      return arr2.filter(arr2Country => {
        return arr2Country.name === arr1Country.name;
      }).length === 1;
    });
  }

  // private _getDifference(arr1: Country[], arr2: Country[]): Country[] {
  //   return arr1.filter(arr1Country => {
  //     return arr2.filter(arr2Country => {
  //       return arr2Country.name === arr1Country.name;
  //     }).length === 0;
  //   });
  // }

  private _groupByVisa(userCountries: Country[], partnerCountries: Country[]): CountryGroupPerPerson {
    return {
      both: this._getIntersection(userCountries, partnerCountries),
      // userOnly: this._getDifference(userCountries, partnerCountries),
      // partnerOnly: this._getDifference(partnerCountries, userCountries),
      user: userCountries,
      partner: partnerCountries
    };
  }

  private _getVisaData(userData: WikiData, partnerData: WikiData): VisaData {
    const data: RawVisaDataJSON = {} as any;

    Visa.getKeys().forEach((visa: Visa) => {
      data[visa] = this._groupByVisa(userData[visa], partnerData[visa]);
    });

    return new VisaData(data);
  }

  private _getCountriesWithVisa(rawData: RawWikiDataJSON) {

    return Visa.getKeys().map((visa: Visa) => {
      return rawData[visa].map((country: { name: string; note?: string }) => new CountryWithVisa(country.name, country.note, visa));
    }).reduce((acc: CountryWithVisa[], curArr: CountryWithVisa[]) => acc.concat(curArr), []);
  }

  private _lookupCountry(arr: CountryWithVisa[], countryName: string): CountryWithVisa {
    const countryInArr = arr.find((country: Country) => {
      return country.name === countryName;
    });

    if (!countryInArr) {
      throw new Error(`Invalid country for lookup: ${countryName}. Not found in the lookup country array`);
    }

    return countryInArr;
  }

  private _getVisaStatus(person: Person, countryName: string) {
    const lookupCountryArr: CountryWithVisa[] = person === Person.USER ? this.userVisas : this.partnerVisas;
    const country = this._lookupCountry(lookupCountryArr, countryName);
    if (country) {
      return Visa.parse(country.visa);
    } else {
      return Visa.UNKNOWN;
    }
  }
}
