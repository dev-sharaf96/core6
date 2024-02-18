import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprehensiveInfoComponent } from './comprehensive-info.component';

describe('ComprehensiveInfoComponent', () => {
  let component: ComprehensiveInfoComponent;
  let fixture: ComponentFixture<ComprehensiveInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprehensiveInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprehensiveInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
