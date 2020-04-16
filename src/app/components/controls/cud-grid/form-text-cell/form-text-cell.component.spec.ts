import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTextCellComponent } from './form-text-cell.component';

describe('FormTextCellComponent', () => {
  let component: FormTextCellComponent;
  let fixture: ComponentFixture<FormTextCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTextCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTextCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
