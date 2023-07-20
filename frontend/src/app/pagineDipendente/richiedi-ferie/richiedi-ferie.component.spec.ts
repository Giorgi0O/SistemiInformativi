import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichiediFerieComponent } from './richiedi-ferie.component';

describe('RichiediFerieComponent', () => {
  let component: RichiediFerieComponent;
  let fixture: ComponentFixture<RichiediFerieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RichiediFerieComponent]
    });
    fixture = TestBed.createComponent(RichiediFerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
