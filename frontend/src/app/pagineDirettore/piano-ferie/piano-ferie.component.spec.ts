import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PianoFerieComponent } from './piano-ferie.component';

describe('PianoFerieComponent', () => {
  let component: PianoFerieComponent;
  let fixture: ComponentFixture<PianoFerieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PianoFerieComponent]
    });
    fixture = TestBed.createComponent(PianoFerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
