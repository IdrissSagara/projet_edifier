import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OuvriersComponent} from "./ouvriers/ouvriers.component";
import {ClientComponent} from "./client/client.component";
import {UtilisateursComponent} from "./utilisateurs/utilisateurs.component";
import {OuvrierDetailsComponent} from "./ouvriers/ouvrier-details/ouvrier-details.component";
import {ClientDetailsComponent} from "./client/client-details/client-details.component";
import {DetailUtilisateurComponent} from "./utilisateurs/detail-utilisateur/detail-utilisateur.component";
import {ClientResolver} from "./client/clients.resolver";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Personnes'
    },
    children: [
      {
        path: '',
        redirectTo: 'clients'
      },
      {
        path: 'clients',
        component: ClientComponent,
        resolve: {
          clients: ClientResolver
        },
        data: {
          title: 'Clients'
        }
      }, {
        path: 'ouvriers',
        component: OuvriersComponent,
        data: {
          title: 'Ouvriers'
        }
      }, {
        path: 'utilisateurs',
        component: UtilisateursComponent,
        data: {
          title: 'Utilisateurs'
        }
      }, {
        path: 'details/:id',
        component: OuvrierDetailsComponent,
        data: {
          title: 'Detail de l\'ouvrier'
        }
      },
      {
        path: 'detail/:id',
        component: ClientDetailsComponent,
        data: {
          title: 'Detail du client'
        }
      },
      {
        path: 'detailsUser/:id',
        component: DetailUtilisateurComponent,
        data: {
          title: 'Detail de l\'utilisateur'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnesRoutingModule {
}
