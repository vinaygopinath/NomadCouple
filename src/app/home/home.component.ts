import { Component, OnInit } from '@angular/core';
import { MaterialSelectComponent } from '../material-select';
import { VisaService } from '../visa.service';
import { Router } from '@angular/router';

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
    console.log('showResults called');
    let formattedUserCountry = this.visaService.getUrlFriendlyName(this.userNationality);
    let formattedPartnerCountry = this.visaService.getUrlFriendlyName(this.partnerNationality);
    this.router.navigate(['/search', formattedUserCountry + '+' + formattedPartnerCountry]);
  }
}
