import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ChantierComponent} from "./chantier.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Chantiers'
    },
    children: [
      {
        path: '',
        redirectTo: 'chantiers'
      },
      {
        path: 'chantiers',
        component: ChantierComponent,
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
export class ChantierRoutingModule {
}
