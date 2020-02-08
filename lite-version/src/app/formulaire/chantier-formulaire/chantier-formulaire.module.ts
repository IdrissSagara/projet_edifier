import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {ClientFormulaireComponent} from '../client-formulaire/client-formulaire.component';
import {ChantierFormulaireRoutingModule} from './chantier-formulaire-routing.module';
import {ChantierFormulaireComponent} from "./chantier-formulaire.component";
import {NgSelectModule} from "@ng-select/ng-select";



@NgModule({
  imports: [
    CommonModule,
    ChantierFormulaireRoutingModule,
    SharedModule,
    NgSelectModule,
  ],
  declarations: [ChantierFormulaireComponent],
})
export class ChantierFormulaireModule { }
