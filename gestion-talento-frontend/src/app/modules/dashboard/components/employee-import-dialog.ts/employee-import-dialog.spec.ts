import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeImportDialog } from './employee-import-dialog.js';

describe('EmployeeImportDialog', () => {
  let component: EmployeeImportDialog;
  let fixture: ComponentFixture<EmployeeImportDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeImportDialog]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EmployeeImportDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
