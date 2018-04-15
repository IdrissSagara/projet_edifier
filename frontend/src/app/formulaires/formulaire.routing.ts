import {Routes} from '@angular/router';
import {FormulaireClientComponent} from './formulaire-client/formulaire-client.component';
import {FormulaireChantierComponent} from './formulaire-chantier/formulaire-chantier.component';
import {FormulaireMouvementEntrantComponent} from './formulaire-mouvement-entrant/formulaire-mouvement-entrant.component';
import {FormulaireMouvementSortantComponent} from './formulaire-mouvement-sortant/formulaire-mouvement-sortant.component';
import {FormulaireBudgetComponent} from './formulaire-budget/formulaire-budget.component';
import {FormulaireOuvrierComponent} from './formulaire-ouvrier/formulaire-ouvrier.component';
import {FormulairePaiementComponent} from './formulaire-paiement/formulaire-paiement.component';


export const FormulaireRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Formulaires',
      status: false
    },
    children: [
      {
        path: 'client',
        component: FormulaireClientComponent,
        data: {
          breadcrumb: 'Client',
          status: true
        }
      },
      {
        path: 'chantier',
        component: FormulaireChantierComponent,
        data: {
          breadcrumb: 'Chantier',
          status: true
        }
      },
      {
        path: 'mouvement/entrant',
        component: FormulaireMouvementEntrantComponent,
        data: {
          breadcrumb: 'Mouvement Entrant',
          status: true
        }
      },
      {
        path: 'mouvement/sortant',
        component: FormulaireMouvementSortantComponent,
        data: {
          breadcrumb: 'Mouvement Sortant',
          status: true
        }
      },
      {
        path: 'budget',
        component: FormulaireBudgetComponent,
        data: {
          breadcrumb: 'Budget',
          status: true
        }
      },
      {
        path: 'ouvrier',
        component: FormulaireOuvrierComponent,
        data: {
          breadcrumb: 'Ouvrier',
          status: true
        }
      },
      {
        path: 'paiement',
        component: FormulairePaiementComponent,
        data: {
          breadcrumb: 'Paiement',
          status: true
        }
      }
    ]
  }
];

