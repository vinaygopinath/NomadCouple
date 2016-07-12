import { provideRouter, RouterConfig }  from '@angular/router';
import { HomeComponent } from './home';
import { SearchComponent } from './search';

const routes: RouterConfig = [
  {
    path: 'start',
    component: HomeComponent
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
