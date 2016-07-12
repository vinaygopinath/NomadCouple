/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ResultsComponent } from './results.component';

describe('Component: Results', () => {
  it('should create an instance', () => {
    let component = new ResultsComponent();
    expect(component).toBeTruthy();
  });
});
