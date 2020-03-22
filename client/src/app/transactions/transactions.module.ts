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
import {MvEntrantComponent} from './mouvement/mv-entrant/mv-entrant.component';
import {MvSortantComponent} from './mouvement/mv-sortant/mv-sortant.component';


@NgModule({
  declarations: [BudgetComponent, FacturesComponent, PaiementsComponent, RecusComponent, MvEntrantComponent, MvSortantComponent],
  imports: [
    CommonModule,
    FormsModule,
    TransactionsRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule,
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
