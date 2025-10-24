import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteAdminDialog } from './invite-admin-dialog';

describe('InviteAdminDialog', () => {
  let component: InviteAdminDialog;
  let fixture: ComponentFixture<InviteAdminDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InviteAdminDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteAdminDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
