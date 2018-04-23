import {Routes} from '@angular/router';
import {EntrepriseComponent} from './entreprise/entreprise.component';
import {UtilisateursComponent} from './utilisateurs/utilisateurs.component';

export const ParametrageRouting: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Parametrage',
      status: false
    },
    children: [
      {
        path: 'entreprise',
        component: EntrepriseComponent,
        data: {
          breadcrumb: 'Entreprise',
          status: true
        }
      }, {
        path: 'utilisateurs',
        component: UtilisateursComponent,
        data: {
          breadcrumb: 'Utilisateurs',
          status: true
        }
      },
    ]
  }
];
