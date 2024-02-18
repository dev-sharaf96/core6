import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionProgramDdlComponent } from './promotion-program-ddl.component';

describe('PromotionProgramDdlComponent', () => {
  let component: PromotionProgramDdlComponent;
  let fixture: ComponentFixture<PromotionProgramDdlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionProgramDdlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionProgramDdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
