import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgenceComponent} from './agence/agence.component';
import {RoutingModule} from "./parametrage.routing.module";
import {AlertModule} from "ngx-bootstrap/alert";
import {FormsModule} from "@angular/forms";
import {NgxSelectModule} from "ngx-select-ex";


@NgModule({
  declarations: [AgenceComponent],
  imports: [
    CommonModule,
    RoutingModule,
    AlertModule,
    FormsModule,
    NgxSelectModule
  ]
})
export class ParametrageModule {
}
