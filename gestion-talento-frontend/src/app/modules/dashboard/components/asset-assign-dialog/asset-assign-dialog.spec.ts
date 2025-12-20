import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAssignDialog } from './asset-assign-dialog';

describe('AssetAssignDialog', () => {
  let component: AssetAssignDialog;
  let fixture: ComponentFixture<AssetAssignDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetAssignDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetAssignDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
