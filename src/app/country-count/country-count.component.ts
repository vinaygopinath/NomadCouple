import { Component, ViewEncapsulation, Input, AfterViewInit } from '@angular/core';
import { Visa } from '../visa.enum';
import { Country } from '../country';
declare var componentHandler: any;

@Component({
  selector: 'nomad-country-count',
  templateUrl: 'country-count.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['country-count.component.scss']
})
export class CountryCountComponent implements AfterViewInit {

  @Input('array')
  public arr: Country[] = [];

  @Input()
  public type: Visa;
  @Input()
  public selected: boolean;
  // Make Visa enum available in template
  public Visa = Visa;

  public ngAfterViewInit() {
    componentHandler.upgradeAllRegistered();
  }
}
