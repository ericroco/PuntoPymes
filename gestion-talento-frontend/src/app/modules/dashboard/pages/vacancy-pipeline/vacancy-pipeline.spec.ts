import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyPipeline } from './vacancy-pipeline';

describe('VacancyPipeline', () => {
  let component: VacancyPipeline;
  let fixture: ComponentFixture<VacancyPipeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacancyPipeline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacancyPipeline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
