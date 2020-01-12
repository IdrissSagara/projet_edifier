import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientRoutingModule} from '../client/client-routing.module';
import {SharedModule} from '../shared/shared.module';
import {OuvrierComponent} from './ouvrier.component';
import {OuvrierRoutingModule} from "./ouvrier-routing.module";



@NgModule({
  imports: [
    CommonModule,
    OuvrierRoutingModule,
    SharedModule,
  ],
  declarations: [OuvrierComponent],
})
export class OuvrierModule { }
