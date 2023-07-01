import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaFerieComponent } from './crea-ferie.component';

describe('CreaFerieComponent', () => {
  let component: CreaFerieComponent;
  let fixture: ComponentFixture<CreaFerieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaFerieComponent]
    });
    fixture = TestBed.createComponent(CreaFerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
