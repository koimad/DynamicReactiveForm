import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayValueChangedComponent } from './display-value-changed.component';

describe('DisplayValueChangedComponent', () => {
  let component: DisplayValueChangedComponent;
  let fixture: ComponentFixture<DisplayValueChangedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayValueChangedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayValueChangedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
