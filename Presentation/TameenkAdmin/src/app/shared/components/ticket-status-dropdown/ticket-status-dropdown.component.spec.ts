import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStatusDropdownComponent } from './ticket-status-dropdown.component';

describe('TicketStatusDropdownComponent', () => {
  let component: TicketStatusDropdownComponent;
  let fixture: ComponentFixture<TicketStatusDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketStatusDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketStatusDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
