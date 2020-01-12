import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {SortantComponent} from './sortant.component';
import {SortantRoutingModule} from './sortant-routing.module';



@NgModule({
  imports: [
    CommonModule,
    SortantRoutingModule,
    SharedModule
  ],
  declarations: [SortantComponent],
})
export class SortantModule { }
