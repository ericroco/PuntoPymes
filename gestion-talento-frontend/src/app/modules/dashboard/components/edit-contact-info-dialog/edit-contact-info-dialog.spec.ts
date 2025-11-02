import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactInfoDialog } from './edit-contact-info-dialog';

describe('EditContactInfoDialog', () => {
  let component: EditContactInfoDialog;
  let fixture: ComponentFixture<EditContactInfoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditContactInfoDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditContactInfoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
