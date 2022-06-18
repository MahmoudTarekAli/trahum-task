import {NgModule} from '@angular/core';
import {LayoutModule} from '../components/cleanui/layout/layout.module';

import {LayoutMainComponent} from './Main/main.component';
import {LayoutPublicComponent} from './Public/public.component';
import {SharedModule} from '../shared/shared.module';

const COMPONENTS = [LayoutMainComponent, LayoutPublicComponent];

@NgModule({
  imports: [SharedModule, LayoutModule, SharedModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class LayoutsModule {
}
