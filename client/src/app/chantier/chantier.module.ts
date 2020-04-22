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


@NgModule({
  declarations: [
    ChantierComponent,
    ChantierModalComponent,
    ChantierDetailsComponent,
  ],
  entryComponents: [
    ChantierModalComponent,
  ],
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule,
    ChantierRoutingModule,
    TabsModule,
    MouvementModule,
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgxSpinnerModule,
    AlertModule.forRoot(),
  ],
  providers: [
    BsModalRef,
  ]
})
export class ChantierModule {
}
