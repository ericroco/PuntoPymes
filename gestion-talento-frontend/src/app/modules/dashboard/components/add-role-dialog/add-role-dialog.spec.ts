import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleDialog } from './add-role-dialog';

describe('AddRoleDialog', () => {
  let component: AddRoleDialog;
  let fixture: ComponentFixture<AddRoleDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRoleDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoleDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
