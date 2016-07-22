import { provideRouter, RouterConfig }  from '@angular/router';
import { HomeComponent } from './home';
import { SearchComponent } from './search';
import { MetaService } from 'ng2-meta';

const routes: RouterConfig = [
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
    path: '',
    redirectTo: '/start',
    terminal: true
  },
  {
    path: 'search/:nationalities',
    component: SearchComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
