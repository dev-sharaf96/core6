import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromotionProgramCodeComponent } from './add-promotion-program-code.component';

describe('AddPromotionProgramCodeComponent', () => {
  let component: AddPromotionProgramCodeComponent;
  let fixture: ComponentFixture<AddPromotionProgramCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPromotionProgramCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPromotionProgramCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
