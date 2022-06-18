import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryTypesComponent } from './beneficiaryTypes.component';

describe('InventoryComponent', () => {
  let component: BeneficiaryTypesComponent;
  let fixture: ComponentFixture<BeneficiaryTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiaryTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
