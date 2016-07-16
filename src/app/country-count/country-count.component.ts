import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Visa } from '../visa.enum';

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
  @Input()
  selected: boolean;
  //Make Visa enum available in template
  Visa = Visa;

  constructor() {}

  ngOnInit() {

  }
}
