import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientRoutingModule} from './client-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ClientComponent} from './client.component';
@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
  ],
  declarations: [ClientComponent],
})
export class ClientModule { }
