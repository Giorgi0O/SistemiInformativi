import { TestBed } from '@angular/core/testing';

import { GiornataFerieService } from './giornata-ferie.service';

describe('GiornataFerieService', () => {
  let service: GiornataFerieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiornataFerieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
