import {Routes} from '@angular/router';
import {FacturesComponent} from './factures/factures.component';
import {RecusComponent} from './recus/recus.component';
import {PaiementsComponent} from './paiements/paiements.component';

export const CaisseRouting: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Caisse',
      status: false
    },
    children: [
      {
        path: 'factures',
        component: FacturesComponent,
        data: {
          breadcrumb: 'Factures',
          status: true
        }
      }, {
        path: 'recus',
        component: RecusComponent,
        data: {
          breadcrumb: 'Réçus',
          status: true
        }
      }, {
        path: 'paiements',
        component: PaiementsComponent,
        data: {
          breadcrumb: 'Paiements',
          status: true
        }
      }
    ]
  }
];
