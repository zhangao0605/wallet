import { TestBed } from '@angular/core/testing';

import { NewwalletserveService } from './newwalletserve.service';

describe('NewwalletserveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewwalletserveService = TestBed.get(NewwalletserveService);
    expect(service).toBeTruthy();
  });
});
