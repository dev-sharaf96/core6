import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuploadPolicyComponent } from './reupload-policy.component';

describe('ReuploadPolicyComponent', () => {
  let component: ReuploadPolicyComponent;
  let fixture: ComponentFixture<ReuploadPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReuploadPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReuploadPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
