import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyPublicPage } from './vacancy-public-page';

describe('VacancyPublicPage', () => {
  let component: VacancyPublicPage;
  let fixture: ComponentFixture<VacancyPublicPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacancyPublicPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacancyPublicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
