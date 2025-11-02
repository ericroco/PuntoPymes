import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayrollItemDialog } from './add-payroll-item-dialog';

describe('AddPayrollItemDialog', () => {
  let component: AddPayrollItemDialog;
  let fixture: ComponentFixture<AddPayrollItemDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPayrollItemDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPayrollItemDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
