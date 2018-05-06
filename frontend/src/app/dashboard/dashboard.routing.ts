import {Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';

export const DashboardRoutes: Routes = [{
  path: '',
  component: DashboardComponent,
  data: {
    breadcrumb: 'Tableau de bord',
    icon: 'icofont-home bg-c-blue',
    status: true
  }
}];
