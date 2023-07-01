import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaTurniComponent } from './modifica-turni.component';

describe('ModificaTurniComponent', () => {
  let component: ModificaTurniComponent;
  let fixture: ComponentFixture<ModificaTurniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificaTurniComponent]
    });
    fixture = TestBed.createComponent(ModificaTurniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
