import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurePhasesDialog } from './configure-phases-dialog';

describe('ConfigurePhasesDialog', () => {
  let component: ConfigurePhasesDialog;
  let fixture: ComponentFixture<ConfigurePhasesDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurePhasesDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurePhasesDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
