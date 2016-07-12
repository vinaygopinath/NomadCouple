import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { VisaService } from '../visa.service';
import { VisaData } from '../visa-data';
import { CountryCountComponent } from '../country-count';
import { Visa } from '../visa.enum';

declare var componentHandler: any;

@Component({
  moduleId: module.id,
  selector: 'nomad-drawer',
  templateUrl: 'drawer.component.html',
  styleUrls: ['drawer.component.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [CountryCountComponent]
})
export class DrawerComponent implements OnInit {
  @Input()
  private user: string;
  @Input()
  private partner: string;
  @Output('on-filter')
  private onCountClick: EventEmitter<any> = new EventEmitter();

  private visaData: VisaData;
  //Make Visa enum available in template
  Visa = Visa;

  constructor(private visaService: VisaService) {
  }

  ngAfterViewInit() {
    componentHandler.upgradeDom();
  }

  ngOnInit() {
    this.visaService.getVisaCountries(this.user, this.partner)
    .subscribe(
      data => {
        console.log('Received data in drawer = ',data);
        this.visaData = data;
      },
      err => console.error('getVisaCountries error = ',err)
    );
  }

  emitCountClick(type, arr) {
    console.log('emitCountClick called with %s and %d items',type,arr.length);
    this.onCountClick.emit({
      type,
      data: arr
    });
  }

}
