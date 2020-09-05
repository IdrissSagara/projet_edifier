import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ChantierComponent} from "./chantier.component";
import {ChantierDetailsComponent} from "./chantier-details/chantier-details.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Chantiers'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ChantierComponent,
        data: {
          title: 'Liste des chantiers'
        }
      },
      {
        path: 'details/:id',
        component: ChantierDetailsComponent,
        data: {
          title: 'Détail du chantier'
        }
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChantierRoutingModule {
}
