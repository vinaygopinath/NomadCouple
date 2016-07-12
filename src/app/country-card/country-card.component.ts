import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Country } from '../country';
import { VisaService } from '../visa.service';
import { Visa } from '../visa.enum';

@Component({
  moduleId: module.id,
  selector: 'nomad-country-card',
  templateUrl: 'country-card.component.html',
  styleUrls: ['country-card.component.css']
})
export class CountryCardComponent implements OnInit {
  @Input()
  country: Country;

  userVisaStatus: Visa;
  partnerVisaStatus: Visa;

  userVisaClass: string;
  partnerVisaClass: string;

  Visa = Visa;

  //TODO Set up HTTP call to Wikipedia
  //Example: https://en.wikipedia.org/w/api.php?format=jsonfm&action=query&prop=extracts&exlimit=max&explaintext&exintro&titles=China&redirects=

  @HostBinding('class')
  cardClass: string = 'country-card mdl-card mdl-shadow--2dp';
  flagClass: string;

  constructor(private visaService: VisaService) {}

  getVisaClass(visaEnum) {
    switch(visaEnum) {
      case Visa.NOT_REQUIRED: return 'not-required';
      case Visa.REQUIRED: return 'required';
      case Visa.ON_ARRIVAL: return 'on-arrival';
      case Visa.UNKNOWN: return 'unknown';
    }
  }

  ngOnInit() {
    this.userVisaStatus = this.visaService.getUserVisaStatus(this.country.name);
    this.userVisaClass = this.getVisaClass(this.userVisaStatus);
    this.partnerVisaStatus = this.visaService.getPartnerVisaStatus(this.country.name);
    this.partnerVisaClass = this.getVisaClass(this.partnerVisaStatus);
    this.flagClass = this.visaService.getCountryFlagClass(this.country.name);
    console.log('CCC userVisaStatus = %s',this.userVisaStatus);
    console.log('CCC partnerVisaStatus = %s',this.partnerVisaStatus);
  }

}
