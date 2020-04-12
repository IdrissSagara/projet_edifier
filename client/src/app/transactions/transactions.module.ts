import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {
  BsDropdownModule,
  CarouselModule,
  CollapseModule,
  PaginationModule,
  PopoverModule,
  ProgressbarModule,
  TabsModule,
  TooltipModule
} from "ngx-bootstrap";
import {TransactionsRoutingModule} from "./transactions.routing.module";
import {BudgetComponent} from './budget/budget.component';
import {FacturesComponent} from './caisse/factures/factures.component';
import {PaiementsComponent} from './caisse/paiements/paiements.component';
import {RecusComponent} from './caisse/recus/recus.component';
import {MouvementsComponent} from './mouvement/mouvements/mouvements.component';
import {MouvementModule} from "./mouvement/mouvement.module";


@NgModule({
  declarations: [BudgetComponent,
    FacturesComponent,
    PaiementsComponent,
    RecusComponent,
    MouvementsComponent],
  imports: [
    CommonModule,
    FormsModule,
    TransactionsRoutingModule,
    TabsModule,
    MouvementModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot()
  ]
})
export class TransactionsModule {
}
