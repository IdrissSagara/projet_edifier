import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ChantierComponent} from "./chantier.component";
import {ChantierDetailsComponent} from "./chantier-details/chantier-details.component";

const routes: Routes = [
  {
    path: 'chantiers',
    component: ChantierComponent,
    data: {
      title: 'Chantiers'
    }
  },
  {
    path: 'chantier/:id',
    component: ChantierDetailsComponent,
    data: {
      title: 'Detail du chantier'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChantierRoutingModule {
}
