import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {PaiementRoutingModule} from './paiement-routing.module';
import {PaiementComponent} from './paiement.component';

@NgModule({
  imports: [
    CommonModule,
    PaiementRoutingModule,
    SharedModule
  ],
  declarations: [PaiementComponent],
})
export class PaiementModule { }
