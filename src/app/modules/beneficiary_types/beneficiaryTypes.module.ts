import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { BeneficiaryTypesRoutingModule } from './beneficiaryTypes-routing.module'
import { BeneficiaryTypesComponent } from './beneficiaryTypes.component'
import { SharedModule } from '../../shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AddBeneficiaryTypeComponent } from './components/add-beneficiary_types/add-beneficiaryType.component'


@NgModule({
  declarations: [BeneficiaryTypesComponent, AddBeneficiaryTypeComponent],
  imports: [
    CommonModule,
    BeneficiaryTypesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class BeneficiaryTypesModule {
}
