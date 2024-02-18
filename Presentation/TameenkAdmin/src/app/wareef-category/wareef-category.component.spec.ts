import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WareefCategoryComponent } from './wareef-category.component';

describe('WareefCategoryComponent', () => {
  let component: WareefCategoryComponent;
  let fixture: ComponentFixture<WareefCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WareefCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WareefCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
