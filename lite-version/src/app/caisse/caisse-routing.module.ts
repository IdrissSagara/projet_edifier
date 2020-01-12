import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Caisse',
      status: false
    },
    children: [
      {
        path: 'facture',
        loadChildren: () => import('./facture/facture.module').then(m => m.FactureModule)
      }, {
        path: 'paiement',
        loadChildren: () => import('./paiement/paiement.module').then(m => m.PaiementModule)
      }, {
        path: 'recu',
        loadChildren: () => import('./recu/recu.module').then(m => m.RecuModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaisseRoutingModule { }
