import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBeneficiaryTypeComponent } from './add-beneficiaryType.component';

describe('AddInventoryComponent', () => {
  let component: AddBeneficiaryTypeComponent;
  let fixture: ComponentFixture<AddBeneficiaryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBeneficiaryTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBeneficiaryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
