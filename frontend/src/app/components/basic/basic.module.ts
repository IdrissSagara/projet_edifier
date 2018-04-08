import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicComponent} from './basic.component';
import {RouterModule} from '@angular/router';
import {BasicRoutes} from './basic.routing';
import {BreadcrumbComponent} from './factures/breadcrumb.component';
import {ButtonComponent} from './recus/button.component';
import {TypographyComponent} from './paiements/typography.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BasicRoutes),
    SharedModule
  ],
  declarations: [
    BasicComponent,
    BreadcrumbComponent,
    ButtonComponent,
    TypographyComponent
  ]
})
export class BasicModule { }
