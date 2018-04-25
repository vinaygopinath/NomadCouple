import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Country } from '../country';
import { VisaService } from '../visa.service';
import { Visa } from '../visa.enum';
import { StringUtils } from '../utils/string';

@Component({
  selector: 'nomad-country-card',
  templateUrl: 'country-card.component.html',
  styleUrls: ['country-card.component.scss']
})
export class CountryCardComponent implements OnInit {

  @Input()
  public country: Country;

  public userVisaStatus: Visa;
  public partnerVisaStatus: Visa;

  public userVisaClass: string;
  public partnerVisaClass: string;

  public wikiUrl: string;

  public Visa = Visa;

  @HostBinding('class')
  public cardClass: string = 'country-card mdl-card mdl-shadow--2dp';
  public flagClass: string;

  public constructor(public visaService: VisaService) { }

  //TODO Set up HTTP call to Wikipedia
  //Example: https://en.wikipedia.org/w/api.php?format=jsonfm&action=query&prop=extracts&exlimit=max&explaintext&exintro&titles=China&redirects=

  public getCountryFlagClass(countryName: string) {
    if (!countryName) {
      throw new Error('Undefined/null country name. Cannot find country flag class');
    }
    let countryStr = countryName.toLowerCase();
    //Normalize inputs
    switch (countryStr) {
      case 'côte-d\'ivoire':
      case 'ivory coast': countryStr = 'côte-divoire'; break;
      case 'the gambia': countryStr = 'gambia'; break;
      case 'republic of ireland': countryStr = 'ireland'; break;
      case 'republic of macedonia': countryStr = 'macedonia'; break;
      case 'federated states of micronesia': countryStr = 'micronesia'; break;
      case 'east timor': countryStr = 'timor-leste'; break;
      case 'the bahamas': countryStr = 'bahamas'; break;
      case 'são tomé and príncipe': countryStr = 'sao-tome-and-principe'; break;
      case 'georgia (country)': countryStr = 'georgia'; break;
    }

    return countryStr.replace(/ /g, '-');
  }

  public ngOnInit() {
    this.userVisaStatus = this.visaService.getUserVisaStatus(this.country.name);
    this.partnerVisaStatus = this.visaService.getPartnerVisaStatus(this.country.name);

    this.userVisaClass = Visa.toCSSClass(this.userVisaStatus);
    this.partnerVisaClass = Visa.toCSSClass(this.partnerVisaStatus);
    this.flagClass = this.getCountryFlagClass(this.country.name);
    this.wikiUrl = StringUtils.getWikiUrl(this.country.name);
  }

}
