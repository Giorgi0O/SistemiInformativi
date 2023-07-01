import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovoDipendenteComponent } from './nuovo-dipendente.component';

describe('NuovoDipendenteComponent', () => {
  let component: NuovoDipendenteComponent;
  let fixture: ComponentFixture<NuovoDipendenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuovoDipendenteComponent]
    });
    fixture = TestBed.createComponent(NuovoDipendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
