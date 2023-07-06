import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuoliComponent } from './ruoli.component';

describe('RuoliComponent', () => {
  let component: RuoliComponent;
  let fixture: ComponentFixture<RuoliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuoliComponent]
    });
    fixture = TestBed.createComponent(RuoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
