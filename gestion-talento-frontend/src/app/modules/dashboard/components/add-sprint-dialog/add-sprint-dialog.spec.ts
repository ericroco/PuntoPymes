import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSprintDialog } from './add-sprint-dialog';

describe('AddSprintDialog', () => {
  let component: AddSprintDialog;
  let fixture: ComponentFixture<AddSprintDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSprintDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSprintDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
