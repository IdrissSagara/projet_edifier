import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Mouvement',
      status: false
    },
    children: [
      {
        path: 'entrant',
        loadChildren: () => import('./entrant/entrant.module').then(m => m.EntrantModule)
      }, {
        path: 'sortant',
        loadChildren: () => import('./sortant/sortant.module').then(m => m.SortantModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MouvementRoutingModule { }
