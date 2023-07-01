import { TestBed } from '@angular/core/testing';

import { RtdService } from './rtd.service';

describe('RtdService', () => {
  let service: RtdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
