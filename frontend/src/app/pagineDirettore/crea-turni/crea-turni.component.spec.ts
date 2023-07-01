import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaTurniComponent } from './crea-turni.component';

describe('CreaTurniComponent', () => {
  let component: CreaTurniComponent;
  let fixture: ComponentFixture<CreaTurniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaTurniComponent]
    });
    fixture = TestBed.createComponent(CreaTurniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
