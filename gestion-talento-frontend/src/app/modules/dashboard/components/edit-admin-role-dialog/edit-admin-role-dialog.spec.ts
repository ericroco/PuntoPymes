import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminRoleDialog } from './edit-admin-role-dialog';

describe('EditAdminRoleDialog', () => {
  let component: EditAdminRoleDialog;
  let fixture: ComponentFixture<EditAdminRoleDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAdminRoleDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdminRoleDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
