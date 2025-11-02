import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAssignmentDialog } from './confirm-assignment-dialog';

describe('ConfirmAssignmentDialog', () => {
  let component: ConfirmAssignmentDialog;
  let fixture: ComponentFixture<ConfirmAssignmentDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmAssignmentDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAssignmentDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
