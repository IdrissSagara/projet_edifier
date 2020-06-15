import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AgenceComponent} from "./agence/agence.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Parametrages'
    },
    children: [
      {
        path: '',
        redirectTo: 'agence'
      },
      {
        path: 'agence',
        component: AgenceComponent,
        data: {
          title: 'Agence'
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
