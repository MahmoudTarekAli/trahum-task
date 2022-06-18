import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { select, Store } from '@ngrx/store';
import { MenuService } from 'src/app/services/menu';
import * as SettingsActions from 'src/app/store/settings/actions';
import * as Reducers from 'src/app/store/reducers';
import { MenuConfig } from '../../../../../services/menu/config';

@Component({
  selector: 'cui-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss'],
})
export class MenuLeftComponent implements OnInit {
  menuColor: String;
  isMenuShadow: Boolean;
  isMenuUnfixed: Boolean;
  isSidebarOpen: Boolean;
  isMobileView: Boolean;
  leftMenuWidth: Number;
  isMenuCollapsed: Boolean;
  logo: String;
  menuData: any[];
  menuDataActivated: any[];
  role: String;
  private Menu = new MenuConfig(this.activatedRoute);
  userRole = localStorage.getItem('user-role');
  userPermissions = localStorage.getItem('permissions');

  constructor(private activatedRoute: ActivatedRoute, private menuService: MenuService, private store: Store<any>, private router: Router) {
    this.menuData = this.Menu.calcMenu();
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.menuColor = state.menuColor;
      this.isMenuShadow = state.isMenuShadow;
      this.isMenuUnfixed = state.isMenuUnfixed;
      this.isSidebarOpen = state.isSidebarOpen;
      this.isMobileView = state.isMobileView;
      this.leftMenuWidth = state.leftMenuWidth;
      this.isMenuCollapsed = state.isMenuCollapsed;
      this.logo = state.logo;
    });
  }

  ngOnInit() {
    this.activateMenu(this.router.url);
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.activateMenu(event.url ? event.url : null);
      });
  }

  activateMenu(url: any, menuData = this.menuData) {
    if (this.userRole === '1') {
      menuData = menuData.filter(data => {
        return data.title === 'Companies';
      });
    } else if (this.userRole === '3') {
      menuData = menuData.filter(data => {
        if (data.children && data.title === 'Operations') {
          return data.children = data.children.filter(child => {
            if (this.userPermissions.indexOf(child.key) > -1) {
              return child;
            }
          });
        }
        return data.title === 'Operations';
      });
    } else {
      menuData = menuData.filter(data => {
        return data.title !== 'Companies';
      });
    }
    const pathWithSelection = this.getPath({ url: url }, menuData, (entry: any) => entry, 'url');
    if (pathWithSelection) {
      pathWithSelection.pop().selected = true;
      _.each(pathWithSelection, (parent: any) => (parent.open = true));
    }
    this.menuDataActivated = menuData.slice();
  }

  getPath(
    element: any,
    source: any,
    property: any,
    keyProperty = 'key',
    childrenProperty = 'children',
    path = [],
  ) {
    let found = false;
    const getElementChildren = (value: any) => _.get(value, childrenProperty);
    const getElementKey = (value: any) => _.get(value, keyProperty);
    const key = getElementKey(element);
    return (
      _.some(source, (e: any) => {
        if (getElementKey(e) === key) {
          path.push(e);
          return true;
        } else {
          return (found = this.getPath(
            element,
            getElementChildren(e),
            property,
            keyProperty,
            childrenProperty,
            path.concat(e),
          ));
        }
      }) &&
      (found || _.map(path, property))
    );
  }

  toggleSettings() {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isSidebarOpen: !this.isSidebarOpen,
      }),
    );
  }

  onCollapse(value: any) {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isMenuCollapsed: value,
      }),
    );
  }
}
