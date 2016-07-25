import { Component, OnInit, HostBinding } from '@angular/core';
import { MaterialSelectComponent } from '../material-select';
import { VisaService } from '../visa.service';
import { Router } from '@angular/router';
import { StringUtils } from '../utils/string';

//TODO Optimize images
const BACKGROUND_TYPE = ['bg-payir','bg-hike','bg-kayak','bg-woods'];

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [MaterialSelectComponent],
  providers: [VisaService]
})
export class HomeComponent implements OnInit {
  userNationality: string;
  partnerNationality: string;
  countries: any[] = [];

  @HostBinding('class')
  backgroundType: string = BACKGROUND_TYPE[Math.floor(Math.random() * BACKGROUND_TYPE.length)];

  constructor(private visaService: VisaService, private router: Router) {}

  ngOnInit() {
    this.visaService.getDropdownCountries()
    .subscribe(
      data => this.countries = data,
      err => console.log(err)
    );
  }

  setCountrySelection(item, index) {
    if (index === 0) {
      this.userNationality = item;
    } else {
      this.partnerNationality = item;
    }
  }

  showResults(event) {
    let formattedUserCountry = StringUtils.getUrlFriendlyName(this.userNationality);
    let formattedPartnerCountry = StringUtils.getUrlFriendlyName(this.partnerNationality);
    this.router.navigate(['/search', formattedUserCountry + '+' + formattedPartnerCountry]);
  }
}
