import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './layouts/admin/admin.component';
import {AuthComponent} from './layouts/auth/auth.component';
import {AuthGuard} from './auth/auth.guard';

// @ts-ignore
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }, {
        path: 'chantier',
        canActivate: [AuthGuard],
        loadChildren: () => import('./chantier/chantier.module').then(m => m.ChantierModule)
      }, {
        path: 'client',
        canActivate: [AuthGuard],
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
      }, {
        path: 'budget',
        canActivate: [AuthGuard],
        loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule)
      }, {
        path: 'caisse',
        canActivate: [AuthGuard],
        loadChildren: () => import('./caisse/caisse.module').then(m => m.CaisseModule)
      }, {
        path: 'ouvrier',
        canActivate: [AuthGuard],
        loadChildren: () => import('./ouvrier/ouvrier.module').then(m => m.OuvrierModule)
      },
      {
        path: 'mouvement',
        canActivate: [AuthGuard],
        loadChildren: () => import('./mouvement/mouvement.module').then(m => m.MouvementModule)
      }, {
        path: 'formulaire',
        canActivate: [AuthGuard],
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
