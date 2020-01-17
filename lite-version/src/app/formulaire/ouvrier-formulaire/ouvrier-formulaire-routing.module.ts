import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ChantierFormulaireComponent} from "../chantier-formulaire/chantier-formulaire.component";
import {OuvrierFormulaireComponent} from "./ouvrier-formulaire.component";

const routes: Routes = [
  {
    path: '',
    component: OuvrierFormulaireComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OuvrierFormulaireRoutingModule { }
