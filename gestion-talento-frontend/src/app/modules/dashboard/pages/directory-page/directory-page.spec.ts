import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryPage } from './directory-page';

describe('DirectoryPage', () => {
  let component: DirectoryPage;
  let fixture: ComponentFixture<DirectoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectoryPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
