import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesInfoComponent } from './policies-info.component';

describe('PoliciesInfoComponent', () => {
  let component: PoliciesInfoComponent;
  let fixture: ComponentFixture<PoliciesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliciesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
