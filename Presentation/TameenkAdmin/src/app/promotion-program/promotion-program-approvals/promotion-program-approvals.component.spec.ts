import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionProgramApprovalsComponent } from './promotion-program-approvals.component';

describe('PromotionProgramApprovalsComponent', () => {
  let component: PromotionProgramApprovalsComponent;
  let fixture: ComponentFixture<PromotionProgramApprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionProgramApprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionProgramApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
