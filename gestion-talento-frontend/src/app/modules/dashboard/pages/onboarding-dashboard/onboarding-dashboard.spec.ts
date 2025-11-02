import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingDashboard } from './onboarding-dashboard';

describe('OnboardingDashboard', () => {
  let component: OnboardingDashboard;
  let fixture: ComponentFixture<OnboardingDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
