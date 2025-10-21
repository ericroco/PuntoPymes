import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerPaths } from './career-paths';

describe('CareerPaths', () => {
  let component: CareerPaths;
  let fixture: ComponentFixture<CareerPaths>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerPaths]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerPaths);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
