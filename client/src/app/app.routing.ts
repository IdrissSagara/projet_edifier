import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// Import Containers
import {DefaultLayoutComponent} from './containers';

import {P404Component} from './error-pages/404.component';
import {P500Component} from './error-pages/500.component';
import {LoginComponent} from './authentication/login/login.component';
import {RegisterComponent} from './authentication/register/register.component';
import {AuthGuard} from "./authentication/authGuard/auth.guard";
import {Role} from "./personnes/utilisateurs/user.roles";
import {UserResolver} from "./resolvers/user.resolver";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: DefaultLayoutComponent,
    resolve: {
      currentUser: UserResolver
    },
    data: {
      title: 'Home',
      roles: [Role.Admin, Role.BasicUser]
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'chantiers',
        loadChildren: () => import('./chantier/chantier.module').then(m => m.ChantierModule)
      },
      {
        path: 'personnes',
        loadChildren: () => import('./personnes/personnes.module').then(m => m.PersonnesModule)
      },
      {
        path: 'transactions',
        loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule)
      },
      {
        path: 'parametrage',
        loadChildren: () => import('./parametrages/parametrage.module').then(m => m.ParametrageModule)
      },
    ]
  },
  {path: '**', component: P404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
