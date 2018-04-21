import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    }, {
      path: 'dashboard',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
    }, {
      path: 'caisse',
      loadChildren: './caisse/caisse.module#CaisseModule'
    }, {
      path: 'chantiers',
      loadChildren: './chantier/chantier.module#ChantierModule'
    },
    {
      path: 'clients',
      loadChildren: './client/client.module#ClientModule'
    }, {
      path: 'budget',
      loadChildren: './components/forms/forms.module#FormsModule'
    }, {
      path: 'ouvriers',
      loadChildren: './ouvrier/ouvrier.module#OuvrierModule',
    }, {
      path: 'mouvement',
      loadChildren: './mouvement/mouvement.module#MouvementModule',
    }, {
      path: 'map',
      loadChildren: './map/map.module#MapModule',
    }, {
      path: 'formulaires',
      loadChildren: './formulaires/formulaires.module#FormulairesModule'
    }
  ]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [
    {
      path: 'authentication',
      loadChildren: './authentication/authentication.module#AuthenticationModule'
    }
  ]
}, {
  path: '**',
  redirectTo: 'error/404'
}];
