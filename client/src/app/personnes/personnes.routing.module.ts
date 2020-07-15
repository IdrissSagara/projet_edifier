import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OuvriersComponent} from "./ouvriers/ouvriers.component";
import {ClientComponent} from "./client/client.component";
import {UtilisateursComponent} from "./utilisateurs/utilisateurs.component";
import {OuvrierDetailsComponent} from "./ouvriers/ouvrier-details/ouvrier-details.component";
import {ClientDetailsComponent} from "./client/client-details/client-details.component";
import {DetailUtilisateurComponent} from "./utilisateurs/detail-utilisateur/detail-utilisateur.component";
import {ClientResolver} from "./client/clients.resolver";
import {RoleGuard} from "../authentication/guards/role.guard";
import {Role} from "./utilisateurs/user.roles";

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
      },
      {
        path: 'clients/detail/:id',
        component: ClientDetailsComponent,
        data: {
          title: 'Details du client'
        }
      },
      {
        path: 'ouvriers',
        component: OuvriersComponent,
        data: {
          title: 'Ouvriers'
        }
      },
      {
        path: 'ouvriers/details/:id',
        component: OuvrierDetailsComponent,
        data: {
          title: 'Details de l\'ouvrier'
        }
      },
      {
        path: 'utilisateurs',
        component: UtilisateursComponent,
        canActivate: [RoleGuard],
        data: {
          title: 'Utilisateurs',
          roles: [Role.Admin, Role.AdvancedUser]
        },
      },
      {
        path: 'utilisateurs/details/:id',
        component: DetailUtilisateurComponent,
        data: {
          title: 'Details de l\'utilisateur'
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
