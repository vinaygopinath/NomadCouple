import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { VisaData } from '../visa-data';
import { Visa } from '../visa.enum';
import { Person } from '../person.enum';
import { StringUtils } from '../utils/string';
import { VisaDataType } from '../visa-data-type.enum';
import { Country } from '../country';
declare const window: Window;

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss'],
  host: {
    '(window:resize)': 'updateScreenWidth($event)'
  }
})
export class SearchComponent implements OnInit, AfterViewInit {

  public visaData: VisaData;
  public userNationality: string;
  public partnerNationality: string;
  public results: Country[];
  public pageTitle: string = 'Loading...';
  public width: number;

  public constructor(
    private element: ElementRef,
    private route: ActivatedRoute
  ) { }

  public ngOnInit() {
    this.route.data.subscribe(({ visaData }: { visaData: VisaData }) => {
      this.visaData = visaData;
      this.results = this.visaData[VisaDataType.BOTH_NOT_REQUIRED];
      this.pageTitle = `${Person.toDescriptionString(Person.BOTH)} - ${Visa.toDescriptionString(Visa.NOT_REQUIRED)}`;
    }, (err: Error) => console.error('Error fetching visa data = ', err));

    this.route.paramMap.subscribe((params: ParamMap) => {
      const userNationality = params.get('userNationality');
      const partnerNationality = params.get('partnerNationality');

      this.userNationality = StringUtils.getUserFriendlyName(userNationality);
      this.partnerNationality = StringUtils.getUserFriendlyName(partnerNationality);
    });
  }

  public ngAfterViewInit() {
    this.width = window.innerWidth;
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
