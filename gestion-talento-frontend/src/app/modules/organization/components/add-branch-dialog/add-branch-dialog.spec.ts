import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBranchDialog } from './add-branch-dialog';

describe('AddBranchDialog', () => {
  let component: AddBranchDialog;
  let fixture: ComponentFixture<AddBranchDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBranchDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBranchDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
