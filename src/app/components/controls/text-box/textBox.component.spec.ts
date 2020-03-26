import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBoxComponent } from './textBox.component';

describe('InputComponent', () => {
  let component: TextBoxComponent;
  let fixture: ComponentFixture<TextBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextBoxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
