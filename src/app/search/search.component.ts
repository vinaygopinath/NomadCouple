import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisaService } from '../visa.service';
import { VisaData } from '../visa-data';
import { Visa } from '../visa.enum';
import { Person } from '../person.enum';
import { StringUtils } from '../utils/string';
import { VisaDataType } from '../visa-data-type.enum';
import { Country } from '../country';
import { MetaService } from 'ng2-meta';
declare const window: Window;

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss'],
  host: {
    '(window:resize)': 'updateScreenWidth($event)'
  }
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {

  public visaData: VisaData;
  public userNationality: string;
  public partnerNationality: string;
  public paramSub: any;
  public results: Country[];
  public pageTitle: string = 'Loading...';
  public width: number;

  public constructor(
    private element: ElementRef,
    private visaService: VisaService,
    private route: ActivatedRoute,
    private metaService: MetaService
  ) { }

  public ngOnInit() {
    this.paramSub = this.route.params.subscribe((params: { userNationality: string; partnerNationality: string }) => {
      const { userNationality, partnerNationality } = params;

      this.userNationality = StringUtils.getUserFriendlyName(userNationality);
      this.partnerNationality = StringUtils.getUserFriendlyName(partnerNationality);
      this.visaService.getVisaCountries(this.userNationality, this.partnerNationality)
        .subscribe(
          (data: VisaData) => {
            this.visaData = data;
            this.results = this.visaData[VisaDataType.BOTH_NOT_REQUIRED];
            this.pageTitle = `${Person.toDescriptionString(Person.BOTH)} - ${Visa.toDescriptionString(Visa.NOT_REQUIRED)}`;
            this.setMetaTags();
          },
          (err: Error) => console.error('getVisaCountries error = ', err)
        );
    });
  }

  public ngAfterViewInit() {
    this.width = window.innerWidth;
  }

  public ngOnDestroy() {
    this.paramSub.unsubscribe();
  }

  public onFilter(filter: { visa: Visa, person: Person }) {
    //Close drawer on filter on mobile and tablet devices
    if (this.width < 1028) {
      const drawer = this.element.nativeElement.querySelector('.mdl-layout');
      drawer.MaterialLayout.toggleDrawer();
    }
    const visaType: Visa = filter.visa;
    const personType: Person = filter.person;
    const visaDataType = VisaDataType.getType(personType, visaType);
    this.pageTitle = `${Person.toDescriptionString(personType)} - ${Visa.toDescriptionString(visaType)}`;
    this.results = this.visaData[visaDataType];
  }

  public updateScreenWidth(event: any) {
    this.width = event.target && event.target.innerWidth;
  }

  private setMetaTags() {
    this.metaService.setTitle(`${this.userNationality} and ${this.partnerNationality} - Visa requirements`);
    const bothNotRequiredCountryNames = this.getCountryNamesForMeta(this.visaData.bothNotRequired);
    const bothOnArrivalCountryNames = this.getCountryNamesForMeta(this.visaData.bothOnArrival);
    const bothNotRequiredExamples = bothNotRequiredCountryNames ? ` (including ${bothNotRequiredCountryNames})` : '';
    const bothOnArrivalExamples = bothOnArrivalCountryNames ? ` (including ${bothOnArrivalCountryNames})` : '';
    const descriptionText = `Couples from ${this.userNationality} and ${this.partnerNationality} \
    can travel to ${this.visaData.bothNotRequired.length} countries visa-free/without a visa${bothNotRequiredExamples} and ${this.visaData.bothOnArrival.length} \
    countries with visa on arrival${bothOnArrivalExamples}. Find out more and plan your travel together!`;
    this.metaService.setTag('description', descriptionText);
  }

  private getCountryNamesForMeta(countries: Country[]): string | null {
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
}
