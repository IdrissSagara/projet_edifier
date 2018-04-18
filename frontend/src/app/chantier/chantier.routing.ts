import {Routes} from '@angular/router';
import {ChantierComponent} from './chantier.component';

export const ChantierRouting: Routes = [
  {
    path: '',
    component: ChantierComponent,
    data: {
      breadcrumb: 'Chantier',
      icon: 'icofont-home bg-c-blue',
      status: true
    }
  }
];
