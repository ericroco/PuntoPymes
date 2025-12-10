import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPayrollDialog } from './process-payroll-dialog';

describe('ProcessPayrollDialog', () => {
  let component: ProcessPayrollDialog;
  let fixture: ComponentFixture<ProcessPayrollDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessPayrollDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessPayrollDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
