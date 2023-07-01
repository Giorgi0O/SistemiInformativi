import { TestBed } from '@angular/core/testing';

import { TurnoLavorativoService } from './turno-lavorativo.service';

describe('TurnoLavorativoService', () => {
  let service: TurnoLavorativoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnoLavorativoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
