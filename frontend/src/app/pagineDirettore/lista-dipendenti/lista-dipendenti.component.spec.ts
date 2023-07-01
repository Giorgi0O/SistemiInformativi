import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDipendentiComponent } from './lista-dipendenti.component';

describe('ListaDipendentiComponent', () => {
  let component: ListaDipendentiComponent;
  let fixture: ComponentFixture<ListaDipendentiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaDipendentiComponent]
    });
    fixture = TestBed.createComponent(ListaDipendentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
