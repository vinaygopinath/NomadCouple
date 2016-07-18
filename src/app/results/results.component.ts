import { Component, OnInit, Input, trigger, state, transition, style, animate } from '@angular/core';
import { CountryCardComponent } from '../country-card';
@Component({
  moduleId: module.id,
  selector: 'nomad-results',
  templateUrl: 'results.component.html',
  styleUrls: ['results.component.css'],
  directives: [CountryCardComponent],
  animations: [
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate('400ms cubic-bezier(0.23, 1, 0.32, 1)')
    ]),
    transition('* => void', [
      animate(100, style({transform: 'translateX(200%)'}))
    ])
  ]),
  trigger('zoomInOut', [
    state('in', style({transform: 'rotateY(0deg)'})),
    transition('void => *', [
      style({transform: 'rotateY(180deg)'}),
      animate('400ms cubic-bezier(0.23, 1, 0.32, 1)')
    ]),
    transition('* => void', [
      animate(100, style({transform: 'rotateY(180deg)'}))
    ])
  ])
]
})
export class ResultsComponent implements OnInit {
  @Input()
  countries: Array<any>;

  constructor() {}

  ngOnInit() {
  }

}
