import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateProfileDialog } from './candidate-profile-dialog';

describe('CandidateProfileDialog', () => {
  let component: CandidateProfileDialog;
  let fixture: ComponentFixture<CandidateProfileDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateProfileDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateProfileDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
