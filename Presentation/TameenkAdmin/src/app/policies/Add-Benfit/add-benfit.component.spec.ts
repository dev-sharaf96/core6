import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBenfitComponent } from './add-benfit.component';

describe('AddBenfitComponent', () => {
  let component: AddBenfitComponent;
  let fixture: ComponentFixture<AddBenfitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBenfitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBenfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
