import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVacancy } from './create-vacancy';

describe('CreateVacancy', () => {
  let component: CreateVacancy;
  let fixture: ComponentFixture<CreateVacancy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVacancy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVacancy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
