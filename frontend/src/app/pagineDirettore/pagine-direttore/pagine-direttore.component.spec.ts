import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagineDirettoreComponent } from './pagine-direttore.component';

describe('PagineDirettoreComponent', () => {
  let component: PagineDirettoreComponent;
  let fixture: ComponentFixture<PagineDirettoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagineDirettoreComponent]
    });
    fixture = TestBed.createComponent(PagineDirettoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
