import {Routes} from '@angular/router';
import {BudgetComponent} from './budget.component';

export const BudgetRouting: Routes = [{
  path: '',
  component: BudgetComponent,
  data: {
    breadcrumb: 'Budgets',
    icon: 'icofont-home bg-c-blue',
    status: true
  }
}
];
