/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';

beforeEach(() => {
  TestBed.configureTestingModule([AppComponent]);
})

describe('App: Nomad Couple', () => {
  it('should create the app',
      inject([AppComponent], (app: AppComponent) => {
    expect(app).toBeTruthy();
  }));
});
