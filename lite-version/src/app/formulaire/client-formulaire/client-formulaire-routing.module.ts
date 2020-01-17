import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientFormulaireComponent} from './client-formulaire.component';

const routes: Routes = [
  {
    path: '',
    component: ClientFormulaireComponent,
    data: {
      breadcrumb: '',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientFormulaireRoutingModule { }
