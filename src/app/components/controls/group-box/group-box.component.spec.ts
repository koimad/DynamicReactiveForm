import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupBoxComponent } from './group-box.component';

describe('GroupBoxComponent', () => {
  let component: GroupBoxComponent;
  let fixture: ComponentFixture<GroupBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [GroupBoxComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
