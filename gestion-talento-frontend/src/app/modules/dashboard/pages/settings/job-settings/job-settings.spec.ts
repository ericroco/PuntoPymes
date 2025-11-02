import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSettings } from './job-settings';

describe('JobSettings', () => {
  let component: JobSettings;
  let fixture: ComponentFixture<JobSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
