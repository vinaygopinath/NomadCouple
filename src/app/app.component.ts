import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { VisaService } from './visa.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [VisaService]
})
export class AppComponent {

  constructor(private visaService: VisaService) {}
}
