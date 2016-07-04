/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { VisaService } from './visa.service';

describe('Visa Service', () => {
  beforeEachProviders(() => [VisaService]);

  it('should ...',
      inject([VisaService], (service: VisaService) => {
    expect(service).toBeTruthy();
  }));
});
