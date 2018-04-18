import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FacturesComponent} from './factures/factures.component';
import {RecusComponent} from './recus/recus.component';
import {PaiementsComponent} from './paiements/paiements.component';
import {SharedModule} from '../shared/shared.module';
import {CaisseRouting} from './caisse.routing';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CaisseRouting),
    SharedModule
  ],
  declarations: [FacturesComponent, RecusComponent, PaiementsComponent]
})
export class CaisseModule {
}
