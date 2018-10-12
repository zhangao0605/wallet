import { TestBed } from '@angular/core/testing';

import { PrintserveService } from './printserve.service';

describe('PrintserveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrintserveService = TestBed.get(PrintserveService);
    expect(service).toBeTruthy();
  });
});
