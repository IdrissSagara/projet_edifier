import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChantierRoutingModule } from './chantier-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ChantierComponent} from './chantier.component';
import {ClientModule} from "../client/client.module";
@NgModule({
  imports: [
    CommonModule,
    ChantierRoutingModule,
    SharedModule,
    ClientModule
  ],
  declarations: [ChantierComponent],
})
export class ChantierModule { }
