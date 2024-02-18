import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveMoiComponent } from './approve-moi.component';

describe('ApproveMoiComponent', () => {
  let component: ApproveMoiComponent;
  let fixture: ComponentFixture<ApproveMoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveMoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveMoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
