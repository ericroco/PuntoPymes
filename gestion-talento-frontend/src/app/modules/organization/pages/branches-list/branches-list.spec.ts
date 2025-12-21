import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesList } from './branches-list';

describe('BranchesList', () => {
  let component: BranchesList;
  let fixture: ComponentFixture<BranchesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
