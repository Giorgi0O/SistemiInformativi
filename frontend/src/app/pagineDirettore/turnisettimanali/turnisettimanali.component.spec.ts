import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnisettimanaliComponent } from './turnisettimanali.component';

describe('TurnisettimanaliComponent', () => {
  let component: TurnisettimanaliComponent;
  let fixture: ComponentFixture<TurnisettimanaliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnisettimanaliComponent]
    });
    fixture = TestBed.createComponent(TurnisettimanaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
