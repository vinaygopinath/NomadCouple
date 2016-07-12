import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisaService } from '../visa.service';
import { VisaData } from '../visa-data';
import { DrawerComponent } from '../drawer';
import { ResultsComponent } from '../results';

@Component({
  moduleId: module.id,
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  providers: [VisaService],
  directives: [DrawerComponent, ResultsComponent]
})
export class SearchComponent implements OnInit, OnDestroy {
  visaData: VisaData;
  userNationality: string;
  partnerNationality: string;
  paramSub: any;
  results: Array<any>;

  constructor(private visaService: VisaService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramSub = this.route.params.subscribe(params => {
      let nationalities = params['nationalities'];
      if (nationalities) {
        let nationalityArr = nationalities.split('+');
        if (nationalityArr.length === 2) {
          this.userNationality = this.visaService.getUserFriendlyName(nationalityArr[0]);
          this.partnerNationality = this.visaService.getUserFriendlyName(nationalityArr[1]);
          this.visaService.getVisaCountries(nationalityArr[0], nationalityArr[1])
          .subscribe(
            data => {
              console.log('Received data = ',data);
              this.visaData = data;
              this.results = this.visaData.bothNotReqCountries;
            },
            err => console.error('getVisaCountries error = ',err)
          );
        }
      }
    });
  }

  onFilter(filter) {
    console.log('onFilter called with',filter);
    this.results = filter.data;
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }

}
