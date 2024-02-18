import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPromotionDomainComponent } from './edit-promotion-domain.component';

describe('EditPromotionDomainComponent', () => {
  let component: EditPromotionDomainComponent;
  let fixture: ComponentFixture<EditPromotionDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPromotionDomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPromotionDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
