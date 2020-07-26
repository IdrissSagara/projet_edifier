import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MouvementModalComponent} from "./mouvement-modal/mouvement-modal.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MouvementModalComponent
  ],
  entryComponents: [
    MouvementModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    MouvementModalComponent,
  ],
})
export class MouvementModule {
}
