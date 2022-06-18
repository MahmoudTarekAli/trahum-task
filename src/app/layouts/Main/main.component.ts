import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as SettingsActions from 'src/app/store/settings/actions';
import * as Reducers from 'src/app/store/reducers';
import { slideFadeinUp, slideFadeinRight, zoomFadein, fadein } from '../router-animations';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [slideFadeinUp, slideFadeinRight, zoomFadein, fadein],
})
export class LayoutMainComponent implements OnInit {
  settings$: Observable<any>;
  isContentMaxWidth: boolean;
  isAppMaxWidth: boolean;
  isGrayBackground: boolean;
  isSquaredBorders: boolean;
  isCardShadow: boolean;
  isBorderless: boolean;
  menuLayoutType: string;
  isMobileView: boolean;
  isMobileMenuOpen: boolean;
  routerAnimation: string;
  isMenuCollapsed: boolean;
  leftMenuWidth: number;
  isTopbarFixed: boolean;
  isGrayTopbar: boolean;
  lang: string;
  touchStartPrev = 0;
  touchStartLocked = false;
  userData = JSON.parse(localStorage.getItem('userData'));

  constructor(private store: Store<any>, private cdr: ChangeDetectorRef) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.lang = state.locale;
      this.isContentMaxWidth = state.isContentMaxWidth;
      this.isAppMaxWidth = state.isAppMaxWidth;
      this.isGrayBackground = state.isGrayBackground;
      this.isSquaredBorders = state.isSquaredBorders;
      this.isCardShadow = state.isCardShadow;
      this.isBorderless = state.isBorderless;
      this.menuLayoutType = state.menuLayoutType;
      this.isMobileView = state.isMobileView;
      this.isMobileMenuOpen = state.isMobileMenuOpen;
      this.routerAnimation = state.routerAnimation;
      this.isMenuCollapsed = state.isMenuCollapsed;
      this.leftMenuWidth = state.leftMenuWidth;
      this.isTopbarFixed = state.isTopbarFixed;
      this.isGrayTopbar = state.isGrayTopbar;
    });
  }

  ngOnInit() {
    this.bindMobileSlide();
  }

  onCollapse(value: any) {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isMenuCollapsed: value,
      }),
    );
  }

  toggleCollapsed() {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isMenuCollapsed: !this.isMenuCollapsed,
      }),
    );
  }

  toggleMobileMenu() {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isMobileMenuOpen: !this.isMobileMenuOpen,
      }),
    );
  }

  bindMobileSlide() {
    // mobile menu touch slide opener
    // @ts-ignore
    const unify = e => {
      return e.changedTouches ? e.changedTouches[0] : e;
    };
    document.addEventListener(
      'touchstart',
      e => {
        const x = unify(e).clientX;
        this.touchStartPrev = x;
        this.touchStartLocked = x > 70 ? true : false;
      },
      { passive: false },
    );
    document.addEventListener(
      'touchmove',
      e => {
        const x = unify(e).clientX;
        const prev = this.touchStartPrev;
        if (x - <any> prev > 50 && !this.touchStartLocked) {
          this.toggleMobileMenu();
          this.touchStartLocked = true;
        }
      },
      { passive: false },
    );
  }

  routeAnimation(outlet: RouterOutlet, animation: string): any {
    if (this.lang) {
      if (animation === this.routerAnimation) {
        // @ts-ignore
        return outlet.isActivated && outlet.activatedRoute.routeConfig.path;
      }
    }
  }
}
