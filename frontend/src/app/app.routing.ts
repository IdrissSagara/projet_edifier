import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';

/**
 * Correspondances NOUVELLES-ANCIENNES routes (Modules)
 *  chantier => Dashboard
 *  caisse => Basic
 *  client => Advance
 *  budget => Forms
 *  ouvrier => Bootstrap-table
 * */

export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [
    {
      path: '',
      redirectTo: 'chantier',
      pathMatch: 'full'
    }, {
      path: 'chantier',
      loadChildren: './chantier/chantier.module#DashboardModule'
    }, {
      path: 'caisse',
      loadChildren: './components/basic/basic.module#BasicModule'
    }, {
      path: 'client', loadChildren: './components/client/advance.module#AdvanceModule'
    }, {
      path: 'budget',
      loadChildren: './components/forms/forms.module#FormsModule'
    }, {
      path: 'ouvrier',
      loadChildren: './components/tables/bootstrap-table/bootstrap-table.module#BootstrapTableModule',
    }, {
      path: 'mouvement',
      loadChildren: './mouvement/mouvement.module#MouvementModule',
    }, {
      path: 'map',
      loadChildren: './map/map.module#MapModule',
    }, {
      path: 'simple-page',
      loadChildren: './simple-page/simple-page.module#SimplePageModule'
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
