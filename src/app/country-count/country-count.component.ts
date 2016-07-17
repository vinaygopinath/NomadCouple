import { Component, ViewEncapsulation, Input, AfterViewInit } from '@angular/core';
import { Visa } from '../visa.enum';
declare var componentHandler: any;

@Component({
  moduleId: module.id,
  selector: 'nomad-country-count',
  templateUrl: 'country-count.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['country-count.component.css']
})
export class CountryCountComponent implements AfterViewInit {
  @Input('array')
  arr: Array<any> = [1,2,3];
  @Input()
  type: Visa;
  @Input()
  selected: boolean;
  //Make Visa enum available in template
  Visa = Visa;

  ngAfterViewInit() {
    componentHandler.upgradeAllRegistered();
  }
}
