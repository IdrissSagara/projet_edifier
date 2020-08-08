import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {TabsModule} from "ngx-bootstrap/tabs";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {PopoverModule} from "ngx-bootstrap/popover";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import {TransactionsRoutingModule} from "./transactions.routing.module";
import {PaiementsComponent} from './caisse/paiements/paiements.component';
import {MouvementsComponent} from './caisse/mouvement/mouvements.component';
import {MouvementModule} from "./caisse/mouvement/mouvement.module";
import {HttpClientModule} from "@angular/common/http";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {DetailPaiementComponent} from './caisse/paiements/detail-paiement/detail-paiement.component';
import {AlertModule} from "ngx-bootstrap/alert";
import {BsModalService, ModalModule} from "ngx-bootstrap/modal";
import {PaiementModalModule} from "./caisse/paiements/paiement-modal/paiement-modal.module";
import {MouvementDetailsComponent} from './caisse/mouvement/mouvement-details/mouvement-details.component';
import {ChantierModule} from "../chantier/chantier.module";

@NgModule({
  declarations: [
    PaiementsComponent,
    MouvementsComponent,
    DetailPaiementComponent,
    MouvementDetailsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    TransactionsRoutingModule,
    PaiementModalModule,
    TabsModule,
    MouvementModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    AlertModule,
    ChantierModule
  ],
  providers: [
    BsModalService
  ]
})
export class TransactionsModule {
}
