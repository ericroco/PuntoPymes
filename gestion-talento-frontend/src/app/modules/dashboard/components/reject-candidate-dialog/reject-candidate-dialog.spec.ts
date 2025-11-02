import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectCandidateDialog } from './reject-candidate-dialog';

describe('RejectCandidateDialog', () => {
  let component: RejectCandidateDialog;
  let fixture: ComponentFixture<RejectCandidateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectCandidateDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectCandidateDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
