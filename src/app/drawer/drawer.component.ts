import { Component, ViewEncapsulation, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { VisaService } from '../visa.service';
import { VisaData } from '../visa-data';
import { Visa } from '../visa.enum';
import { Person } from '../person.enum';

declare var componentHandler: any;

@Component({
  selector: 'nomad-drawer',
  templateUrl: 'drawer.component.html',
  styleUrls: ['drawer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DrawerComponent implements OnChanges {

  public selectedTab: Person = Person.BOTH;
  public selectedVisaSection: Visa = Visa.NOT_REQUIRED;

  @Input()
  public user: string;
  @Input()
  public partner: string;
  @Output('on-filter')
  public onCountClick: EventEmitter<any> = new EventEmitter();

  public visaData: VisaData;

  //Make Visa and Person enums available in template
  public Visa = Visa;
  public Person = Person;

  public constructor(private visaService: VisaService) {
  }

  public ngAfterViewInit() {
    componentHandler.upgradeDom();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.user || changes.partner) {
      this.updateVisaData();
    }
  }

  public emitCountClick(person: Person, visa: Visa) {
    this.selectedTab = person;
    this.selectedVisaSection = visa;
    this.onCountClick.emit({
      person,
      visa
    });
  }

  private updateVisaData() {
    this.visaService.getVisaCountries(this.user, this.partner)
      .subscribe(
        (data: VisaData) => {
          this.visaData = data;
        },
        (err: Error) => console.error('getVisaCountries error = ', err)
      );
  }

}
