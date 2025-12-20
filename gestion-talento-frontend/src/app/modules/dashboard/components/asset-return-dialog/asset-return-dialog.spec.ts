import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetReturnDialog } from './asset-return-dialog';

describe('AssetReturnDialog', () => {
  let component: AssetReturnDialog;
  let fixture: ComponentFixture<AssetReturnDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetReturnDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetReturnDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
