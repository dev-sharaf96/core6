import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundConfirmComponent } from './refund-confirm.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('RefundConfirmComponent', () => {
  let component: RefundConfirmComponent;
  let fixture: ComponentFixture<RefundConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundConfirmComponent ],
      imports: [DialogModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
