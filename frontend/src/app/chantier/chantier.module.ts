import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChantierComponent} from './chantier.component';
import {ChantierRouting} from './chantier.routing';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ChantierRouting),
    SharedModule, DataTableModule
  ],
  declarations: [ChantierComponent]
})
export class ChantierModule {
}
