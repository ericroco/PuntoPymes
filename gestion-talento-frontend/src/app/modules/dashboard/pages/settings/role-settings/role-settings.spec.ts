import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSettings } from './role-settings';

describe('RoleSettings', () => {
  let component: RoleSettings;
  let fixture: ComponentFixture<RoleSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
