import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblInfoComponent } from './tbl-info.component';

describe('TblInfoComponent', () => {
  let component: TblInfoComponent;
  let fixture: ComponentFixture<TblInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
