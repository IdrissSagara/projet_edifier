import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {RecuComponent} from './recu.component';
import {RecuRoutingModule} from './recu-routing.module';



@NgModule({
  imports: [
    CommonModule,
    RecuRoutingModule,
    SharedModule
  ],
  declarations: [RecuComponent],
})
export class RecuModule { }
