import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScheduleDialog } from './edit-schedule-dialog';

describe('EditScheduleDialog', () => {
  let component: EditScheduleDialog;
  let fixture: ComponentFixture<EditScheduleDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditScheduleDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditScheduleDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
