import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChantierRoutingModule } from './chantier-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ChantierComponent} from './chantier.component';
@NgModule({
  imports: [
    CommonModule,
    ChantierRoutingModule,
    SharedModule
  ],
  declarations: [ChantierComponent],
})
export class ChantierModule { }
