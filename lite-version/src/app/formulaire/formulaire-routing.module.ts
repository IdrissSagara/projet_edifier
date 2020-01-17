import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: ' Formulaire',
      status: false
    },
    children: [
      {
        path: 'client-formulaire',
        loadChildren: () => import('./client-formulaire/client-formulaire.module').then(m => m.ClientFormulaireModule)
      }, {
        path: 'chantier-formulaire',
        loadChildren: () => import('./chantier-formulaire/chantier-formulaire.module').then(m => m.ChantierFormulaireModule)
      }, {
        path: 'ouvrier-formulaire',
        loadChildren: () => import('./ouvrier-formulaire/ouvrier-formulaire.module').then(m => m.OuvrierFormulaireModule)
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulaireRoutingModule { }
