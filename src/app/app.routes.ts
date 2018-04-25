import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { SearchComponent } from './search';

export const routes: Routes = [
  {
    path: 'start',
    component: HomeComponent,
    data: {
      meta: {
        title: 'Nomad Couple',
        titleSuffix: ' - Travel the world',
        description: 'Discover visa-free, visa-on-arrival and online visa countries that you can visit together with your partner'
      }
    }
  },
  {
    path: 'search/:nationalities',
    component: SearchComponent
  },
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  }
];
