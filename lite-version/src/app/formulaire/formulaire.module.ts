import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {FormulaireComponent} from './formulaire.component';
import {FormulaireRoutingModule} from './formulaire-routing.module';
import { ChantierFormulaireComponent } from './chantier-formulaire/chantier-formulaire.component';
import { OuvrierFormulaireComponent } from './ouvrier-formulaire/ouvrier-formulaire.component';



@NgModule({
  imports: [
    CommonModule,
    FormulaireRoutingModule,
    SharedModule
  ],
  declarations: [FormulaireComponent],
})
export class FormulaireModule { }
