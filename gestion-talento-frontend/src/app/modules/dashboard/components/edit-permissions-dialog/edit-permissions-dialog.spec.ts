import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPermissionsDialog } from './edit-permissions-dialog';

describe('EditPermissionsDialog', () => {
  let component: EditPermissionsDialog;
  let fixture: ComponentFixture<EditPermissionsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPermissionsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPermissionsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
