import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {CaisseComponent} from './caisse.component';
import {CaisseRoutingModule} from './caisse-routing.module';



@NgModule({
  imports: [
    CommonModule,
    CaisseRoutingModule,
    SharedModule
  ],
  declarations: [CaisseComponent],
})
export class CaisseModule { }
