import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
// import { MetaConfig, MetaModule } from 'ng2-meta';
import { AppComponent } from './app.component';
import { CountryCardComponent } from './country-card';
import { CountryCountComponent } from './country-count';
import { DrawerComponent } from './drawer';
import { HomeComponent } from './home';
import { ResultsComponent } from './results';
import { SearchComponent } from './search';
import { routes } from './app.routes';
import { VisaService } from './visa.service';

// const metaConfig: MetaConfig = {
//   //Append a title suffix such as a site name to all titles
//   //Defaults to false
//   useTitleSuffix: true,
//   defaults: {
//     title: 'Nomad Couple',
//     titleSuffix: ' | Nomad Couple'
//   }
// };

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
    HttpModule,
    NgSelectModule,
    RouterModule.forRoot(routes),
    // MetaModule.forRoot(metaConfig)
  ],
  providers: [VisaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
