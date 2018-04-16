import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormulaireClientComponent} from './formulaire-client/formulaire-client.component';
import {RouterModule} from '@angular/router';
import {FormulaireRoutes} from './formulaire.routing';
import {FormulaireChantierComponent} from './formulaire-chantier/formulaire-chantier.component';
import {FormulaireMouvementEntrantComponent} from './formulaire-mouvement-entrant/formulaire-mouvement-entrant.component';
import {FormulaireMouvementSortantComponent} from './formulaire-mouvement-sortant/formulaire-mouvement-sortant.component';
import {FormulaireBudgetComponent} from './formulaire-budget/formulaire-budget.component';
import {FormulaireOuvrierComponent} from './formulaire-ouvrier/formulaire-ouvrier.component';
import {FormulairePaiementComponent} from './formulaire-paiement/formulaire-paiement.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FormulaireRoutes),
    SharedModule
  ],
  declarations: [
    FormulaireClientComponent,
    FormulaireChantierComponent,
    FormulaireMouvementEntrantComponent,
    FormulaireMouvementSortantComponent,
    FormulaireBudgetComponent,
    FormulaireOuvrierComponent,
    FormulairePaiementComponent]
})
export class FormulairesModule {
}
