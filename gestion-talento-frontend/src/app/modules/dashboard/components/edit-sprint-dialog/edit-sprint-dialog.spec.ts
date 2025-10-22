import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSprintDialog } from './edit-sprint-dialog';

describe('EditSprintDialog', () => {
  let component: EditSprintDialog;
  let fixture: ComponentFixture<EditSprintDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSprintDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSprintDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
