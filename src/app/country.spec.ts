/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import {Country} from './country';

describe('Country', () => {

  it('should create an instance', () => {
    expect(new Country('ABC', 'DEF')).toBeTruthy();
  });

});
