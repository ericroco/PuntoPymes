import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesDetail } from './expenses-detail';

describe('ExpensesDetail', () => {
  let component: ExpensesDetail;
  let fixture: ComponentFixture<ExpensesDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
