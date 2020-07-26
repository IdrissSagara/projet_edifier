import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ChantierRoutingModule} from "./chantier.routing.module";
import {ChantierComponent} from "./chantier.component";
import {ChantierModalComponent} from './chantier-modal/chantier-modal.component';
import {ChantierDetailsComponent} from './chantier-details/chantier-details.component';
import {ChartsModule} from "ng2-charts";
import {MouvementModule} from "../transactions/mouvement/mouvement.module";
import {NgxSpinnerModule} from "ngx-spinner";
import {TabsModule} from "ngx-bootstrap/tabs";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {PopoverModule} from "ngx-bootstrap/popover";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import {BsModalRef, ModalModule} from "ngx-bootstrap/modal";
import {AlertModule} from "ngx-bootstrap/alert";
import {NgxSelectModule} from "ngx-select-ex";
import {PaiementModalComponent} from './paiement-modal/paiement-modal.component';
import {CarouselModule} from "ngx-bootstrap/carousel";
import {LightboxModule} from "@ngx-gallery/lightbox";
import {GalleryModule} from "@ngx-gallery/core";
import {IntCommaPipe} from "../utils/pipes/intcomma.pipe";

@NgModule({
  declarations: [
    ChantierComponent,
    ChantierModalComponent,
    ChantierDetailsComponent,
    PaiementModalComponent,
    IntCommaPipe,
  ],
  entryComponents: [
    ChantierModalComponent,
    PaiementModalComponent,
  ],
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule,
    ChantierRoutingModule,
    TabsModule,
    MouvementModule,
    NgxSpinnerModule,
    NgxSelectModule,
    GalleryModule,
    LightboxModule,
    CarouselModule,
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
  ],
  providers: [
    BsModalRef,
  ]
})
export class ChantierModule {
}

