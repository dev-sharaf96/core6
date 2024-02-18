import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WareefDescriptionComponent } from './wareef-description.component';

describe('WareefDescriptionComponent', () => {
  let component: WareefDescriptionComponent;
  let fixture: ComponentFixture<WareefDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WareefDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WareefDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
