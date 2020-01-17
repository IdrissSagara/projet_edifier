import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChantierFormulaireRoutingModule} from "../chantier-formulaire/chantier-formulaire-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {ChantierFormulaireComponent} from "../chantier-formulaire/chantier-formulaire.component";
import {OuvrierFormulaireComponent} from "./ouvrier-formulaire.component";
import {OuvrierFormulaireRoutingModule} from "./ouvrier-formulaire-routing.module";



@NgModule({
  imports: [
    CommonModule,
    OuvrierFormulaireRoutingModule,
    SharedModule,
  ],
  declarations: [OuvrierFormulaireComponent],
})
export class OuvrierFormulaireModule { }
