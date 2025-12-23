import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnnouncementDialog } from './create-announcement-dialog';

describe('CreateAnnouncementDialog', () => {
  let component: CreateAnnouncementDialog;
  let fixture: ComponentFixture<CreateAnnouncementDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAnnouncementDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAnnouncementDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
