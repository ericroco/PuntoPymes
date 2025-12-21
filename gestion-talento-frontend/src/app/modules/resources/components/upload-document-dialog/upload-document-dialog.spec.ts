import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDocumentDialog } from './upload-document-dialog';

describe('UploadDocumentDialog', () => {
  let component: UploadDocumentDialog;
  let fixture: ComponentFixture<UploadDocumentDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadDocumentDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDocumentDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
