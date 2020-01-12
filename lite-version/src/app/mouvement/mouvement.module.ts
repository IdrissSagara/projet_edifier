import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {MouvementComponent} from './mouvement.component';
import {MouvementRoutingModule} from './mouvement-routing.module';



@NgModule({
  imports: [
    CommonModule,
    MouvementRoutingModule,
    SharedModule
  ],
  declarations: [MouvementComponent],
})
export class MouvementModule { }
