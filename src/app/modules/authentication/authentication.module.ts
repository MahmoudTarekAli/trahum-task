import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {SigninComponent} from './signin/signin.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LayoutModule } from '../../components/cleanui/layout/layout.module'
import {SharedModule} from '../../shared/shared.module';
import { SignUpComponent } from './signUp/signUp.component';

@NgModule({
  declarations: [
    SigninComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    SharedModule,
    LayoutModule,
  ],
})
export class AuthenticationModule {
}
