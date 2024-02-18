import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WareefComponent } from './wareef.component';

describe('WareefComponent', () => {
  let component: WareefComponent;
  let fixture: ComponentFixture<WareefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WareefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WareefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
