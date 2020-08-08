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
        redirectTo: 'paiements'
      },
      {
        path: 'paiements',
        component: PaiementsComponent,
        data: {
          title: 'Paiements'
        },
      },
      {
        path: 'paiements/detail/:id/:idChantier',
        component: DetailPaiementComponent,
        data: {
          title: 'Details du Paiements'
        },
      },
      {
        path: 'mouvements',
        data: {
          title: 'Mouvement'
        },
        children: [
          {
            path: '',
            redirectTo: 'mouvements'
          }, {
            path: 'mouvements',
            component: MouvementsComponent,
            data: {
              title: 'Mouvements '
            }
          },
          {
            path: 'mouvements/detail/:id',
            component: MouvementDetailsComponent,
            data: {
              title: 'Details du Mouvement'
            },
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
