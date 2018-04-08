import {Routes} from '@angular/router';
import {EntrantComponent} from './entrant/entrant.component';
import {SortantComponent} from './sortant/sortant.component';
export const MouvementRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Mouvements d\'argent',
      status: false
    },
    children: [
      {
        path: 'entrant',
        component: EntrantComponent,
        data: {
          breadcrumb: 'Mouvement Entrant',
          status: true
        }
      }, {
        path: 'sortant',
        component: SortantComponent,
        data: {
          breadcrumb: 'Mouvement Sortant',
          status: true
        }
      }
    ]
  }
];

