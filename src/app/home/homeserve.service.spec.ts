import { TestBed, inject } from '@angular/core/testing';

import { HomeserveService } from './homeserve.service';

describe('HomeserveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeserveService]
    });
  });

  it('should be created', inject([HomeserveService], (service: HomeserveService) => {
    expect(service).toBeTruthy();
  }));
});
