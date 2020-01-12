import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChantierComponent } from './chantier.component';

const routes: Routes = [
  {
    path: '',
    component: ChantierComponent,
    data: {
      breadcrumb: 'Chantier'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChantierRoutingModule { }

