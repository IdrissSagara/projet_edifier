import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgenceComponent} from './agence/agence.component';
import {RoutingModule} from "./parametrage.routing.module";


@NgModule({
  declarations: [AgenceComponent],
  imports: [
    CommonModule,
    RoutingModule
  ]
})
export class ParametrageModule {
}
