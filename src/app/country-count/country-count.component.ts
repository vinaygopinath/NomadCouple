import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Visa } from '../visa.enum';

declare var componentHandler: any;

@Component({
  moduleId: module.id,
  selector: 'nomad-country-count',
  templateUrl: 'country-count.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['country-count.component.css']
})
export class CountryCountComponent implements OnInit {
  @Input('array')
  arr: Array<any> = [1,2,3];
  @Input()
  type: Visa;
  //Make Visa enum available in template
  Visa = Visa;

  constructor() {}

  ngOnInit() {

  }

  ngAfterViewInit() {
    componentHandler.upgradeDom();
  }

  getClassFromType() {
    return {
      required: this.type === Visa.REQUIRED,
      'not-required': this.type === Visa.NOT_REQUIRED,
      'on-arrival': this.type === Visa.ON_ARRIVAL,
      'unknown': this.type === Visa.UNKNOWN
    };
  }

}
