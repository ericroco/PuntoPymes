import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandingSettings } from './branding-settings';

describe('BrandingSettings', () => {
  let component: BrandingSettings;
  let fixture: ComponentFixture<BrandingSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandingSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandingSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
