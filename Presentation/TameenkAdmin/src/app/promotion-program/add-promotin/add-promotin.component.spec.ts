import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromotinComponent } from './add-promotin.component';

describe('AddPromotinComponent', () => {
  let component: AddPromotinComponent;
  let fixture: ComponentFixture<AddPromotinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPromotinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPromotinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
