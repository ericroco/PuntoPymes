import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireCandidateDialog } from './hire-candidate-dialog';

describe('HireCandidateDialog', () => {
  let component: HireCandidateDialog;
  let fixture: ComponentFixture<HireCandidateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HireCandidateDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HireCandidateDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
