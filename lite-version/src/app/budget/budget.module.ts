import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BudgetRoutingModule} from './budget-routing.module';
import {SharedModule} from '../shared/shared.module';
import {BudgetComponent} from './budget.component';



@NgModule({
  imports: [
    CommonModule,
    BudgetRoutingModule,
    SharedModule
  ], declarations: [BudgetComponent],
})
export class BudgetModule { }
