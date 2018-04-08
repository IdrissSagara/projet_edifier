import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EntrantComponent} from './entrant/entrant.component';
import {SortantComponent} from './sortant/sortant.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EntrantComponent,
    SortantComponent
  ]
})
export class MouvementModule {
}
