import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './layouts/admin/admin.component';
import {AuthComponent} from './layouts/auth/auth.component';
import {AuthGuard} from './auth/auth.guard';
import {Role} from './utilisateur/user.roles';

// @ts-ignore
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.BasicUser] },
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }, {
        path: 'chantier',
        loadChildren: () => import('./chantier/chantier.module').then(m => m.ChantierModule)
      }, {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
      }, {
        path: 'budget',
        loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule)
      }, {
        path: 'caisse',
        loadChildren: () => import('./caisse/caisse.module').then(m => m.CaisseModule)
      }, {
        path: 'ouvrier',
        loadChildren: () => import('./ouvrier/ouvrier.module').then(m => m.OuvrierModule)
      },
      {
        path: 'mouvement',
        loadChildren: () => import('./mouvement/mouvement.module').then(m => m.MouvementModule)
      }, {
        path: 'formulaire',
        loadChildren: () => import('./formulaire/formulaire.module').then(m => m.FormulaireModule)
      },
      {
        path: 'basic',
        loadChildren: () => import('./components/basic/basic.module').then(m => m.BasicModule)
      }, {
        path: 'notifications',
        loadChildren: () => import('./components/advance/notifications/notifications.module').then(m => m.NotificationsModule)
      }, {
        path: 'forms',
        loadChildren: () => import('./components/forms/basic-elements/basic-elements.module').then(m => m.BasicElementsModule)
      }, {
        path: 'bootstrap-table',
        loadChildren: () => import('./components/tables/bootstrap-table/basic-bootstrap/basic-bootstrap.module').then(m => m.BasicBootstrapModule),
      }, {
        path: 'map',
        loadChildren: () => import('./map/google-map/google-map.module').then(m => m.GoogleMapModule),
      }, {
        path: 'simple-page',
        loadChildren: () => import('./simple-page/simple-page.module').then(m => m.SimplePageModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
