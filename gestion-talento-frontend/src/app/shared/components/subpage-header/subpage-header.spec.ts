import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpageHeader } from './subpage-header';

describe('SubpageHeader', () => {
  let component: SubpageHeader;
  let fixture: ComponentFixture<SubpageHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubpageHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubpageHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
