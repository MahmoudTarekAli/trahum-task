import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {WidgetsComponentsModule} from 'src/app/components/kit/widgets/widgets-components.module';

import {TopbarComponent} from './Topbar/topbar.component';
import {TopbarActionsComponent} from './Topbar/Actions/actions.component';
import {TopbarSearchComponent} from './Topbar/Search/search.component';
import {TopbarUserMenuComponent} from './Topbar/UserMenu/user-menu.component';
import {MenuLeftComponent} from './Menu/MenuLeft/menu-left.component';
import {MenuTopComponent} from './Menu/MenuTop/menu-top.component';
import {FooterComponent} from './Footer/footer.component';
import {BreadcrumbsComponent} from './Breadcrumbs/breadcrumbs.component';
import {SidebarComponent} from './Sidebar/sidebar.component';
import {MenuStoreComponent} from './Menu/MenuStore/menu-store.component';
import {TopbarLanguageSwitcherComponent} from './Topbar/LanguageSwitcher/language-switcher.component';
import {SharedModule} from '../../../shared/shared.module';

const COMPONENTS = [
  TopbarLanguageSwitcherComponent,
  TopbarComponent,
  TopbarSearchComponent,
  TopbarUserMenuComponent,
  TopbarActionsComponent,
  MenuLeftComponent,
  MenuTopComponent,
  FooterComponent,
  BreadcrumbsComponent,
  SidebarComponent,
  MenuStoreComponent,
];

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    WidgetsComponentsModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class LayoutModule {
}
