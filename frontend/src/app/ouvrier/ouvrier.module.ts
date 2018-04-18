import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OuvrierComponent} from './ouvrier.component';
import {OuvrierRouting} from './ouvrier.routing';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(OuvrierRouting),
    SharedModule
  ],
  declarations: [OuvrierComponent]
})
export class OuvrierModule {
}
