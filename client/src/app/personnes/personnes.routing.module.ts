import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OuvriersComponent} from "./ouvriers/ouvriers.component";
import {ClientComponent} from "./client/client.component";
import {UtilisateursComponent} from "./utilisateurs/utilisateurs.component";
import {OuvrierDetailsComponent} from "./ouvriers/ouvrier-details/ouvrier-details.component";

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
