import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {SharedModule} from "primeng/primeng";
import {ParametrageRouting} from "./parametrage.routing";
import {EntrepriseComponent} from "./entreprise/entreprise.component";
import {UtilisateursComponent} from "./utilisateurs/utilisateurs.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ParametrageRouting),
    SharedModule,
  ],
  declarations: [EntrepriseComponent,UtilisateursComponent]
})
export class ParametrageModule { }
