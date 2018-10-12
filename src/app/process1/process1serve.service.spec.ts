import { TestBed } from '@angular/core/testing';

import { Process1serveService } from './process1serve.service';

describe('Process1serveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Process1serveService = TestBed.get(Process1serveService);
    expect(service).toBeTruthy();
  });
});
