import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BudgetComponent} from "./budget/budget.component";
import {RecusComponent} from "./caisse/recus/recus.component";
import {PaiementsComponent} from "./caisse/paiements/paiements.component";
import {FacturesComponent} from "./caisse/factures/factures.component";
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
        path: 'budget',
        component: BudgetComponent,
        data: {
          title: 'Budget'
        }
      }, {
        path: 'detail/:id',
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
          }, {
            path: 'factures',
            component: FacturesComponent,
            data: {
              title: 'Factures'
            }
          }, {
            path: 'paiements',
            component: PaiementsComponent,
            data: {
              title: 'Paiements'
            },
          }, {
            path: 'recus',
            component: RecusComponent,
            data: {
              title: 'Reçus'
            }
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
