import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BudgetComponent} from './budget.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {BudgetRouting} from './budget.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BudgetRouting),
    SharedModule
  ],
  declarations: [BudgetComponent]
})
export class BudgetModule {
}
