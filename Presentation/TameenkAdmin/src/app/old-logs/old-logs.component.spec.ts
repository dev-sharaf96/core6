import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldLogsComponent } from './old-logs.component';

describe('OldLogsComponent', () => {
  let component: OldLogsComponent;
  let fixture: ComponentFixture<OldLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
