import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {FactureComponent} from './facture.component';
import {FactureRoutingModule} from './facture-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FactureRoutingModule,
    SharedModule
  ],
  declarations: [FactureComponent],
})
export class FactureModule { }
