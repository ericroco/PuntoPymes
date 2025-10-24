import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoleUsersDialog } from './view-role-users-dialog';

describe('ViewRoleUsersDialog', () => {
  let component: ViewRoleUsersDialog;
  let fixture: ComponentFixture<ViewRoleUsersDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRoleUsersDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRoleUsersDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
