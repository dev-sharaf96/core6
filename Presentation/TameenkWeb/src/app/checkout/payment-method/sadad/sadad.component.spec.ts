import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadadComponent } from './sadad.component';

describe('SadadComponent', () => {
  let component: SadadComponent;
  let fixture: ComponentFixture<SadadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
