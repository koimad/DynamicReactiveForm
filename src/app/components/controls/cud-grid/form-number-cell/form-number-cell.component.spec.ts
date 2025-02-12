import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNumberCellComponent } from './form-number-cell.component';

describe('FormNumberCellComponent', () => {
  let component: FormNumberCellComponent;
  let fixture: ComponentFixture<FormNumberCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [FormNumberCellComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNumberCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
