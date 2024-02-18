import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionProgramDomainComponent } from './promotion-program-domain.component';

describe('PromotionProgramDomainComponent', () => {
  let component: PromotionProgramDomainComponent;
  let fixture: ComponentFixture<PromotionProgramDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionProgramDomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionProgramDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
