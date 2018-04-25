import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisaService } from '../visa.service';
import { VisaData } from '../visa-data';
import { Visa } from '../visa.enum';
import { Person } from '../person.enum';
import { StringUtils } from '../utils/string';
import { VisaDataType } from '../visa-data-type.enum';
import { Country } from '../country';
// import { MetaService } from 'ng2-meta';
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

  // constructor(private element: ElementRef, private visaService: VisaService, private route: ActivatedRoute, private metaService: MetaService) { }
  public constructor(private element: ElementRef, private visaService: VisaService, private route: ActivatedRoute) { }

  public ngOnInit() {
    this.paramSub = this.route.params.subscribe((params: { nationalities?: string }) => {
      const nationalities = params.nationalities;
      if (!nationalities) {
        // TODO: Log error to console, or show an error to the user
        return;
      }
      const nationalityArr = nationalities.split('+');
      if (nationalityArr.length !== 2) {
        // TODO: Log error to console, or show an error to the user
        return;
      }
      this.userNationality = StringUtils.getUserFriendlyName(nationalityArr[0]);
      this.partnerNationality = StringUtils.getUserFriendlyName(nationalityArr[1]);
      this.visaService.getVisaCountries(nationalityArr[0], nationalityArr[1])
        .subscribe(
          data => {
            this.visaData = data;
            this.results = this.visaData.bothNotRequired;
            this.pageTitle = `${Person.toDescriptionString(Person.BOTH)} - ${Visa.toDescriptionString(Visa.NOT_REQUIRED)}`;
            // this.metaService.setTitle(`${this.userNationality} and ${this.partnerNationality} - Visa requirements`);
            // this.metaService.setTag('description', `Couples from ${this.userNationality} and ${this.partnerNationality}
            // can visit ${this.visaData.bothNotRequired.length} countries visa-free and ${this.visaData.bothOnArrival.length} countries with visa on arrival. Find out more!`)
          },
          err => console.error('getVisaCountries error = ', err)
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
}
