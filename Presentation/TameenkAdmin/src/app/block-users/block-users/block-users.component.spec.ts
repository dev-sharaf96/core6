import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockUsersComponent } from './block-users.component';

describe('BlockUsersComponent', () => {
  let component: BlockUsersComponent;
  let fixture: ComponentFixture<BlockUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
