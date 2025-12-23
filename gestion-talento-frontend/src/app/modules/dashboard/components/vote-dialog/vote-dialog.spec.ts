import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteDialog } from './vote-dialog';

describe('VoteDialog', () => {
  let component: VoteDialog;
  let fixture: ComponentFixture<VoteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
