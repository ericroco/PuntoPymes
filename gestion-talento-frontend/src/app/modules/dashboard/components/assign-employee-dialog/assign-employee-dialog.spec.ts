import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEmployeeDialog } from './assign-employee-dialog';

describe('AssignEmployeeDialog', () => {
  let component: AssignEmployeeDialog;
  let fixture: ComponentFixture<AssignEmployeeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignEmployeeDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignEmployeeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
