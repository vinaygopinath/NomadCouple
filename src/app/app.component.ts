import { Component } from '@angular/core';
import { VisaService } from './visa.service';
import { HomeComponent } from './home';
import { SearchComponent } from './search';
import { MetaService } from 'ng2-meta';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(private visaService: VisaService, private metaService: MetaService) {
  }
}
