import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientComponent} from './client.component';
import {ClientRouting} from './client.routing';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClientRouting),
    SharedModule
  ],
  declarations: [ClientComponent]
})
export class ClientModule {
}
