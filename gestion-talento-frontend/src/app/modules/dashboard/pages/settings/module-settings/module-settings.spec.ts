import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSettings } from './module-settings';

describe('ModuleSettings', () => {
  let component: ModuleSettings;
  let fixture: ComponentFixture<ModuleSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
