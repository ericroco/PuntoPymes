import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpenseItemDialog } from './add-expense-item-dialog';

describe('AddExpenseItemDialog', () => {
  let component: AddExpenseItemDialog;
  let fixture: ComponentFixture<AddExpenseItemDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExpenseItemDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExpenseItemDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
