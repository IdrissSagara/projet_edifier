import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChantierComponent} from './chantier.component';
import {ChantierRouting} from './chantier.routing';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ChantierRouting),
    SharedModule
  ],
  declarations: [ChantierComponent]
})
export class ChantierModule {
}
