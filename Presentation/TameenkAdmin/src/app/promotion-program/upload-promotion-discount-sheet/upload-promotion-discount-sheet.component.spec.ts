import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPromotionDiscountSheetComponent } from './upload-promotion-discount-sheet.component';

describe('UploadPromotionDiscountSheetComponent', () => {
  let component: UploadPromotionDiscountSheetComponent;
  let fixture: ComponentFixture<UploadPromotionDiscountSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPromotionDiscountSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPromotionDiscountSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
