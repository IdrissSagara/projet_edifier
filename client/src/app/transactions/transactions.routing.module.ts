import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PaiementsComponent} from "./caisse/paiements/paiements.component";
import {MouvementsComponent} from "./caisse/mouvement/mouvements.component";
import {DetailPaiementComponent} from "./caisse/paiements/detail-paiement/detail-paiement.component";
import {MouvementDetailsComponent} from "./caisse/mouvement/mouvement-details/mouvement-details.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Transactions'
    },
    children: [
      {
        path: '',
        redirectTo: 'mouvements'
      },
      {
        children: [
          {
            path: 'paiements',
            component: PaiementsComponent,
            data: {
              title: 'Paiements'
            },
          },
        ]
      },
      {
        children: [
          {
            path: '',
            component: MouvementsComponent,
            data: {
              title: 'Mouvements '
            }
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule {
}
