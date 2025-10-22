import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyLibrary } from './policy-library';

describe('PolicyLibrary', () => {
  let component: PolicyLibrary;
  let fixture: ComponentFixture<PolicyLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyLibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyLibrary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
