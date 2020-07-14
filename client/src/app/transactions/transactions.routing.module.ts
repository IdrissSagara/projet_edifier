import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PaiementsComponent} from "./caisse/paiements/paiements.component";
import {MouvementsComponent} from "./mouvement/mouvements/mouvements.component";
import {DetailPaiementComponent} from "./caisse/paiements/detail-paiement/detail-paiement.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Transactions'
    },
    children: [
      {
        path: '',
        redirectTo: 'budget'
      },
      {
        path: 'detail/:id/:idChantier',
        component: DetailPaiementComponent,
        data: {
          title: 'Detail du Paiements'
        },
      }, {
        path: 'caisse',
        data: {
          title: 'Caisse'
        }, children: [
          {
            path: '',
            redirectTo: 'factures'
          },
          {
            path: 'paiements',
            component: PaiementsComponent,
            data: {
              title: 'Paiements'
            },
          },
        ]
      }, {
        path: 'mouvements',
        data: {
          title: 'Mouvement'
        }, children: [
          {
            path: '',
            redirectTo: 'entrant'
          }, {
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
