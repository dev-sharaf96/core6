import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonProductComponent } from './comparison-product.component';

describe('ComparisonProductComponent', () => {
  let component: ComparisonProductComponent;
  let fixture: ComponentFixture<ComparisonProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparisonProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
