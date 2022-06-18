import {NgModule} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AntdModule} from './antd.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxMatIntlTelInputModule} from 'ngx-mat-intl-tel-input';
import {MatFormFieldModule} from '@angular/material/form-field';


const MODULES = [CommonModule, RouterModule, AntdModule, TranslateModule, NgxMatIntlTelInputModule,
  MatFormFieldModule];

@NgModule({
  imports: [...MODULES],
  declarations: [],
  exports: [...MODULES],
  providers: [DatePipe]

})
export class SharedModule {
}
