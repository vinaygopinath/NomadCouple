import { Component, OnInit, Input } from '@angular/core';
import { CountryCardComponent } from '../country-card';
@Component({
  moduleId: module.id,
  selector: 'nomad-results',
  templateUrl: 'results.component.html',
  styleUrls: ['results.component.css'],
  directives: [CountryCardComponent]
})
export class ResultsComponent implements OnInit {
  @Input()
  countries: Array<any>;

  constructor() {}

  ngOnInit() {
  }

}
