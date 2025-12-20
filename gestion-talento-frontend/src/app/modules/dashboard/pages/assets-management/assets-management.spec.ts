import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsManagement } from './assets-management';

describe('AssetsManagement', () => {
  let component: AssetsManagement;
  let fixture: ComponentFixture<AssetsManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
