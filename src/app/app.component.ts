import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { VisaService } from './visa.service';
import { HomeComponent } from './home';
import { SearchComponent } from './search';
import { MetaService } from 'ng2-meta';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [VisaService, MetaService],
  precompile: [HomeComponent, SearchComponent]
})
export class AppComponent {

  constructor(private visaService: VisaService, private metaService: MetaService) {}
}
