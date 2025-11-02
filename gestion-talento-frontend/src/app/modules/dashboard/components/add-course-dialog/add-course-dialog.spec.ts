import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseDialog } from './add-course-dialog';

describe('AddCourseDialog', () => {
  let component: AddCourseDialog;
  let fixture: ComponentFixture<AddCourseDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCourseDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCourseDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
