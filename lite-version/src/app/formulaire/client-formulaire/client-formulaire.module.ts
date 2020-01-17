import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientRoutingModule} from "../../client/client-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {ClientComponent} from "../../client/client.component";
import {ClientFormulaireComponent} from "./client-formulaire.component";
import {ClientFormulaireRoutingModule} from "./client-formulaire-routing.module";



@NgModule({
  imports: [
    CommonModule,
    ClientFormulaireRoutingModule,
    SharedModule,
  ],
  declarations: [ClientFormulaireComponent],
})
export class ClientFormulaireModule { }
