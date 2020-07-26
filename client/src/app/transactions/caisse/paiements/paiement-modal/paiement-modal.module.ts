import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaiementModalComponent} from "./paiement-modal.component";
import {FormsModule} from "@angular/forms";
import {ModalModule} from "ngx-bootstrap/modal";


@NgModule({
  declarations: [PaiementModalComponent],
  entryComponents: [
    PaiementModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  exports: [
    PaiementModalComponent
  ]
})
export class PaiementModalModule {
}
