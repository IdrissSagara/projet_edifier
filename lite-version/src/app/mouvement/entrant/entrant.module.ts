import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {EntrantRoutingModule} from './entrant-routing.module';
import {EntrantComponent} from './entrant.component';



@NgModule({
  imports: [
    CommonModule,
    EntrantRoutingModule,
    SharedModule
  ],
  declarations: [EntrantComponent],
})
export class EntrantModule { }
