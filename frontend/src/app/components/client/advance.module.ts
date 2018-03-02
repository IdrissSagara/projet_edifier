import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdvanceComponent} from './advance.component';
import {RouterModule} from '@angular/router';
import {AdvanceRoutes} from './advance.routing';
import {ClientComponent} from './client.component';
import {SharedModule} from '../../shared/shared.module';
import {ClientDialogComponent} from './client-dialog/client-dialog.component';
import {DialogModule} from 'primeng/primeng';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [CommonModule, DialogModule, NgSelectModule,
    RouterModule.forChild(AdvanceRoutes),
    SharedModule
  ], declarations: [AdvanceComponent, ClientComponent, ClientDialogComponent
  ]
})
export class AdvanceModule { }
