import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisaService } from '../visa.service';
import { VisaData } from '../visa-data';
import { DrawerComponent } from '../drawer';
import { ResultsComponent } from '../results';
import { Visa } from '../visa.enum';
import { Person } from '../person.enum';
import { StringUtils } from '../utils/string';
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
  visaData: VisaData;
  userNationality: string;
  partnerNationality: string;
  paramSub: any;
  results: Array<any>;
  pageTitle: string = 'Loading...';
  width: number;
//  private metaService: MetaService
  constructor(private element: ElementRef, private visaService: VisaService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramSub = this.route.params.subscribe(params => {
      let nationalities = params['nationalities'];
      if (nationalities) {
        let nationalityArr = nationalities.split('+');
        if (nationalityArr.length === 2) {
          this.userNationality = StringUtils.getUserFriendlyName(nationalityArr[0]);
          this.partnerNationality = StringUtils.getUserFriendlyName(nationalityArr[1]);
          this.visaService.getVisaCountries(nationalityArr[0], nationalityArr[1])
          .subscribe(
            data => {
              this.visaData = data;
              this.results = this.visaData.bothNotRequired;
              this.pageTitle = Person.toDescriptionString(Person.BOTH) + ' - ' + Visa.toDescriptionString(Visa.NOT_REQUIRED);
              // this.metaService.setTitle(`${this.userNationality} and ${this.partnerNationality} - Visa requirements`);
              // this.metaService.setTag('description', `Couples from ${this.userNationality} and ${this.partnerNationality} can visit ${this.visaData.bothNotRequired.length} countries visa-free and ${this.visaData.bothOnArrival.length} countries with visa on arrival. Find out more!`)
            },
            err => console.error('getVisaCountries error = ',err)
          );
        }
      }
    });
  }

  ngAfterViewInit() {
    this.width = window.innerWidth;
  }

  onFilter(filter) {
    //Close drawer on filter on mobile and tablet devices
    if (this.width < 1028) {
      let drawer = this.element.nativeElement.querySelector('.mdl-layout');
      drawer.MaterialLayout.toggleDrawer();
    }
    let visaType: Visa = filter.visa;
    let personType: Person = filter.person;
    let str = StringUtils.toCamelCase(Person.toString(personType)+'-'+Visa.toString(visaType));
    this.pageTitle = Person.toDescriptionString(personType) + ' - ' + Visa.toDescriptionString(visaType);
    this.results = this.visaData[str];
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }

  updateScreenWidth(event) {
    this.width = event.target.innerWidth;
  }
}
