import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EntrantComponent} from './entrant.component';

const routes: Routes = [
  {
    path: '',
    component: EntrantComponent,
    data: {
      breadcrumb: 'Entrant',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrantRoutingModule { }
