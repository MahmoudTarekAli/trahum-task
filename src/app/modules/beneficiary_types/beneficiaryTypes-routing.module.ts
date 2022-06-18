import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeneficiaryTypesComponent } from './beneficiaryTypes.component';
import { AddBeneficiaryTypeComponent } from './components/add-beneficiary_types/add-beneficiaryType.component'

const routes: Routes = [
  {
    path: '',
    component: BeneficiaryTypesComponent,
  },
  {
    path: 'add-beneficiaryTypes',
    component: AddBeneficiaryTypeComponent,

  },
  {
    path: 'update-beneficiaryTypes/:id',
    component: AddBeneficiaryTypeComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiaryTypesRoutingModule {
}
