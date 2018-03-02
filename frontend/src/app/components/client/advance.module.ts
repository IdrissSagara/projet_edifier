import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdvanceComponent} from './advance.component';
import {RouterModule} from '@angular/router';
import {AdvanceRoutes} from './advance.routing';
import {ClientComponent} from './client.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdvanceRoutes),
    SharedModule
  ],
  declarations: [AdvanceComponent, ClientComponent
  ]
})
export class AdvanceModule { }
