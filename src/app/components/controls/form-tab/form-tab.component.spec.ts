import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTabComponent } from './form-tab.component';

describe('FormTabComponent', () => {
  let component: FormTabComponent;
  let fixture: ComponentFixture<FormTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [FormTabComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
