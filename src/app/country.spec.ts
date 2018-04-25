// import { inject } from '@angular/core/testing';

import { Country } from './country';

describe('Country', () => {

  it('should create an instance', () => {
    expect(new Country('ABC', 'DEF')).toBeTruthy();
  });

});
