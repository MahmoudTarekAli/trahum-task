import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { LayoutMainComponent } from 'src/app/layouts/Main/main.component';
import { CanActivateViaAuthGuard } from './modules/authentication/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
    canActivate: [CanActivateViaAuthGuard],
    children: [
      {
        path: 'beneficiaryTypes',
        loadChildren: () => import('src/app/modules/beneficiary_types/beneficiaryTypes.module').then(m => m.BeneficiaryTypesModule),
        canActivate: [CanActivateViaAuthGuard],
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule),
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      useHash: false,
    }),
    LayoutsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
