import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BudgetComponent} from "./budget/budget.component";
import {RecusComponent} from "./caisse/recus/recus.component";
import {PaiementsComponent} from "./caisse/paiements/paiements.component";
import {FacturesComponent} from "./caisse/factures/factures.component";
import {MvSortantComponent} from "./mouvement/mv-sortant/mv-sortant.component";
import {MvEntrantComponent} from "./mouvement/mv-entrant/mv-entrant.component";

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
            }
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
            path: 'entrant',
            component: MvEntrantComponent,
            data: {
              title: 'Mouvements entrants'
            }
          }, {
            path: 'sortant',
            component: MvSortantComponent,
            data: {
              title: 'Mouvements sortants'
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
