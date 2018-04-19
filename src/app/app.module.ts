import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
// import { MetaConfig, MetaModule } from 'ng2-meta';
import { AppComponent } from './app.component';
import { CountryCardComponent } from './country-card';
import { CountryCountComponent } from './country-count';
import { DrawerComponent } from './drawer';
import { HomeComponent } from './home';
import { MaterialSelectComponent } from './material-select';
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
    MaterialSelectComponent,
    ResultsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    // MetaModule.forRoot(metaConfig)
  ],
  providers: [VisaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
