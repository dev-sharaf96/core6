import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsNewComponent } from './requests-new.component';

describe('RequestsComponent', () => {
  let component: RequestsNewComponent;
  let fixture: ComponentFixture<RequestsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
