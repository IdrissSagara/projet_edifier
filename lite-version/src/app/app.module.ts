import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminComponent} from './layouts/admin/admin.component';
import {TitleComponent} from './layouts/admin/title/title.component';
import {BreadcrumbsComponent} from './layouts/admin/breadcrumbs/breadcrumbs.component';
import {AuthComponent} from './layouts/auth/auth.component';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UtilisateurComponent} from './utilisateur/utilisateur.component';
import {JwtModule} from '@auth0/angular-jwt';
import {UtilService} from './service/util.service';
import {AuthService} from './service/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './auth/auth.guard';
import {ToastyModule} from "ng2-toasty";
import {ToastService} from "./service/toast.service";
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    TitleComponent,
    BreadcrumbsComponent,
    AuthComponent,
    UtilisateurComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    NgSelectModule,
    HttpClientModule,
    ToastyModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
          return     localStorage.getItem('token'); },
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['http://localhost:3000/auth/login']
      }
    })
  ],
  providers: [UtilService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
