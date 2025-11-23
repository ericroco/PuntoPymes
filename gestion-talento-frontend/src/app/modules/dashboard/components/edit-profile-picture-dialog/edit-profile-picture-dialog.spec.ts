import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilePictureDialog } from './edit-profile-picture-dialog';

describe('EditProfilePictureDialog', () => {
  let component: EditProfilePictureDialog;
  let fixture: ComponentFixture<EditProfilePictureDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfilePictureDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfilePictureDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
