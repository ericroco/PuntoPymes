import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpisSettings } from './kpis-settings';

describe('KpisSettings', () => {
  let component: KpisSettings;
  let fixture: ComponentFixture<KpisSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpisSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpisSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
