import { TestBed } from '@angular/core/testing';

import { FormUpdatedValuesServiceService } from './form-updated-values.service';

describe('FormUpdatedValuesServiceService', () => {
  let service: FormUpdatedValuesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormUpdatedValuesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
