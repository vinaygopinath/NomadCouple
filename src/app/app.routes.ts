import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { SearchComponent, VisaDataResolver } from './search';
import { MetaGuard } from 'ng2-meta';

export const routes: Routes = [
  {
    path: 'search/:userNationality/:partnerNationality',
    canActivate: [MetaGuard],
    component: SearchComponent,
    resolve: {
      visaData: VisaDataResolver
    }
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'Nomad Couple',
        titleSuffix: ' - Travel the world',
        description: 'Discover visa-free, visa-on-arrival and online visa countries that you can visit together with your partner'
      }
    }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'prefix'
  }
];
