import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CudGridComponent } from './cud-grid.component';

describe('CudGridComponent', () => {
  let component: CudGridComponent;
  let fixture: ComponentFixture<CudGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CudGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CudGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
