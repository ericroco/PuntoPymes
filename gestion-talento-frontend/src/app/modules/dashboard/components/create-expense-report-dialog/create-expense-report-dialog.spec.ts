import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExpenseReportDialog } from './create-expense-report-dialog';

describe('CreateExpenseReportDialog', () => {
  let component: CreateExpenseReportDialog;
  let fixture: ComponentFixture<CreateExpenseReportDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateExpenseReportDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateExpenseReportDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
