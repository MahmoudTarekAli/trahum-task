import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, LOCALE_ID} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgProgressModule} from '@ngx-progressbar/core';
import {NgProgressRouterModule} from '@ngx-progressbar/router';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {reducers, metaReducers} from './store/reducers';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);

// locale resistration
import {CoreModule} from './core/core.module';
import {CanActivateViaAuthGuard} from './modules/authentication/auth-guard/auth.guard';
import {NZ_I18N, en_US} from 'ng-zorro-antd/i18n';

const LOCALE_PROVIDERS = [
  {provide: LOCALE_ID, useValue: 'en'},
  {provide: NZ_I18N, useValue: en_US},
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    // translate
    TranslateModule.forRoot(),
    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),

    // nprogress
    NgProgressModule.withConfig({
      thick: true,
      spinner: false,
      color: '#0190fe',
    }),
    NgProgressRouterModule,
    NgProgressHttpModule,

    // init firebase
  ],
  providers: [
    // auth services
    // fake http interceptors
    CanActivateViaAuthGuard,
    // locale providers
    ...LOCALE_PROVIDERS,

    // firestore settings
  ],
  bootstrap: [AppComponent],
  exports: [
  ],
})
export class AppModule {
}
