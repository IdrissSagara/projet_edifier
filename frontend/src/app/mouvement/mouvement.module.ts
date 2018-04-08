import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EntrantComponent} from './entrant/entrant.component';
import {SortantComponent} from './sortant/sortant.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MouvementRoutes} from './mouvement.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MouvementRoutes),
    SharedModule
  ],
  declarations: [
    EntrantComponent,
    SortantComponent
  ]
})
export class MouvementModule {
}
