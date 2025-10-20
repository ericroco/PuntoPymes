import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationChart } from './organization-chart';

describe('OrganizationChart', () => {
  let component: OrganizationChart;
  let fixture: ComponentFixture<OrganizationChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
