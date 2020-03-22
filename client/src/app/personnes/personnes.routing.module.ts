import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OuvriersComponent} from "./ouvriers/ouvriers.component";
import {ClientComponent} from "./client/client.component";
import {UtilisateursComponent} from "./utilisateurs/utilisateurs.component";

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
          title: 'Chantiers'
        }
      }, {
        path: 'ouvriers',
        component: OuvriersComponent,
        data: {
          title: 'Chantiers'
        }
      }, {
        path: 'utilisateurs',
        component: UtilisateursComponent,
        data: {
          title: 'Chantiers'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnesRoutingModule {
}
