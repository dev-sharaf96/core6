import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromotionProgramDomainComponentComponent } from './add-promotion-program-domain-component.component';

describe('AddPromotionProgramDomainComponentComponent', () => {
  let component: AddPromotionProgramDomainComponentComponent;
  let fixture: ComponentFixture<AddPromotionProgramDomainComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPromotionProgramDomainComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPromotionProgramDomainComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
