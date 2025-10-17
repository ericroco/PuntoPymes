import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksProductivity } from './tasks-productivity';

describe('TasksProductivity', () => {
  let component: TasksProductivity;
  let fixture: ComponentFixture<TasksProductivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksProductivity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksProductivity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
