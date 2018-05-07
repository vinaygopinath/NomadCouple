import { Component, OnInit, HostBinding } from '@angular/core';
import { VisaService } from '../visa.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { StringUtils } from '../utils/string';

//TODO Optimize images
const BACKGROUND_TYPE = ['bg-payir', 'bg-hike', 'bg-kayak', 'bg-woods'];

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [VisaService]
})
export class HomeComponent implements OnInit {
  public userNationality: string;
  public partnerNationality: string;
  public countries: Observable<string[]>;

  @HostBinding('class')
  public backgroundType: string = BACKGROUND_TYPE[Math.floor(Math.random() * BACKGROUND_TYPE.length)];

  public constructor(private visaService: VisaService, private router: Router) { }

  public ngOnInit() {
    this.countries = this.visaService.getDropdownCountries();
  }

  public showResults() {
    const formattedUserCountry = StringUtils.getUrlFriendlyName(this.userNationality);
    const formattedPartnerCountry = StringUtils.getUrlFriendlyName(this.partnerNationality);
    this.router.navigate(['/search', formattedUserCountry, formattedPartnerCountry]);
  }
}
