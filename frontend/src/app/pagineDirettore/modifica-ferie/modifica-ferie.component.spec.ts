import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaFerieComponent } from './modifica-ferie.component';

describe('ModificaFerieComponent', () => {
  let component: ModificaFerieComponent;
  let fixture: ComponentFixture<ModificaFerieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificaFerieComponent]
    });
    fixture = TestBed.createComponent(ModificaFerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
