import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SortantComponent} from './sortant.component';

const routes: Routes = [
  {
    path: '',
    component: SortantComponent,
    data: {
      breadcrumb: 'Sortant',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SortantRoutingModule { }
