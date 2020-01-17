import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChantierFormulaireComponent} from './chantier-formulaire.component';

const routes: Routes = [
  {
    path: '',
    component: ChantierFormulaireComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChantierFormulaireRoutingModule { }
