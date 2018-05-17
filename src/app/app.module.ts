import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { MetaConfig, MetaModule } from 'ng2-meta';
import { AppComponent } from './app.component';
import { CountryCardComponent } from './country-card';
import { CountryCountComponent } from './country-count';
import { DrawerComponent } from './drawer';
import { HomeComponent } from './home';
import { ResultsComponent } from './results';
import { SearchComponent, VisaDataResolver } from './search';
import { routes } from './app.routes';
import { VisaService } from './visa.service';
import { environment } from '../environments/environment';

const metaConfig: MetaConfig = {
  //Append a title suffix such as a site name to all titles
  //Defaults to false
  useTitleSuffix: true,
  defaults: {
    title: 'Nomad Couple',
    titleSuffix: ' | Nomad Couple'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    CountryCardComponent,
    CountryCountComponent,
    DrawerComponent,
    HomeComponent,
    ResultsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    RouterModule.forRoot(routes),
    MetaModule.forRoot(metaConfig),
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [VisaService, VisaDataResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
