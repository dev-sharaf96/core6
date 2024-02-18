import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionProgramCodeDetailsComponent } from './promotion-program-code-details.component';

describe('PromotionProgramCodeDetailsComponent', () => {
  let component: PromotionProgramCodeDetailsComponent;
  let fixture: ComponentFixture<PromotionProgramCodeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionProgramCodeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionProgramCodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
