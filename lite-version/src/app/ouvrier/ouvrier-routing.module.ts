import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OuvrierComponent} from './ouvrier.component';


const routes: Routes = [
  {
    path: '',
    component: OuvrierComponent,
    data: {
      breadcrumb: 'Ouvrier',
      status: true
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OuvrierRoutingModule { }
