import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitAssignment } from './benefit-assignment';

describe('BenefitAssignment', () => {
  let component: BenefitAssignment;
  let fixture: ComponentFixture<BenefitAssignment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenefitAssignment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenefitAssignment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
