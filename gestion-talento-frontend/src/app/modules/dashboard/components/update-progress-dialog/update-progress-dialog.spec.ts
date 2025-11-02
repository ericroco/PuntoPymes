import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProgressDialog } from './update-progress-dialog';

describe('UpdateProgressDialog', () => {
  let component: UpdateProgressDialog;
  let fixture: ComponentFixture<UpdateProgressDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProgressDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProgressDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
