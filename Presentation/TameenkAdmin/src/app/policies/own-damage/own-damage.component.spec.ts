import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnDamageComponent } from './own-damage.component';

describe('OwnDamageComponent', () => {
  let component: OwnDamageComponent;
  let fixture: ComponentFixture<OwnDamageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnDamageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
