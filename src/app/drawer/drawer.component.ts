import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { VisaService } from '../visa.service';
import { VisaData } from '../visa-data';
import { CountryCountComponent } from '../country-count';
import { Visa } from '../visa.enum';
import { Person } from '../person.enum';

declare var componentHandler: any;

@Component({
  selector: 'nomad-drawer',
  templateUrl: 'drawer.component.html',
  styleUrls: ['drawer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DrawerComponent implements OnInit {
  private selectedTab: Person = Person.BOTH;
  private selectedVisaSection: Visa = Visa.NOT_REQUIRED;

  @Input()
  private user: string;
  @Input()
  private partner: string;
  @Output('on-filter')
  private onCountClick: EventEmitter<any> = new EventEmitter();

  private visaData: VisaData;
  //Make Visa and Person enums available in template
  Visa = Visa;
  Person = Person;

  constructor(private visaService: VisaService) {
  }

  ngAfterViewInit() {
    componentHandler.upgradeDom();
  }

  ngOnInit() {
    this.visaService.getVisaCountries(this.user, this.partner)
    .subscribe(
      data => {
        this.visaData = data;
      },
      err => console.error('getVisaCountries error = ',err)
    );
  }

  emitCountClick(person: Person, visa: Visa) {
    this.selectedTab = person;
    this.selectedVisaSection = visa;
    this.onCountClick.emit({
      person,
      visa
    });
  }

}
