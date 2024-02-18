import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadWareefDiscountComponent } from './upload-wareef-discount.component';

describe('UploadWareefDiscountComponent', () => {
  let component: UploadWareefDiscountComponent;
  let fixture: ComponentFixture<UploadWareefDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadWareefDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadWareefDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
