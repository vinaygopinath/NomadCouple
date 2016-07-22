import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { AppComponent, environment } from './app/';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import {HTTP_PROVIDERS} from '@angular/http';
import { VisaService } from './app/visa.service';
import { Title } from '@angular/platform-browser';
import { MetaConfig, MetaService } from 'ng2-meta';

if (environment.production) {
  enableProdMode();
}

let metaConfig = new MetaConfig({
  useTitleSuffix: true,
  defaults: {
    title: 'Nomad Couple',
    titleSuffix: ' | Nomad Couple'
  }
});

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  VisaService,
  Title,
  provide('meta.config', {useValue: metaConfig}),
  MetaService
]);
