import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoalDialog } from './add-goal-dialog';

describe('AddGoalDialog', () => {
  let component: AddGoalDialog;
  let fixture: ComponentFixture<AddGoalDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGoalDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGoalDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
