import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientComponent} from './client/client.component';
import {OuvriersComponent} from './ouvriers/ouvriers.component';
import {UtilisateursComponent} from './utilisateurs/utilisateurs.component';
import {FormsModule} from "@angular/forms";
import {TabsModule} from "ngx-bootstrap/tabs";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {PopoverModule} from "ngx-bootstrap/popover";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import {BsModalService, ModalModule} from "ngx-bootstrap/modal";
import {PersonnesRoutingModule} from "./personnes.routing.module";
import {ClientModalComponent} from "./client/client-modal/client-modal.component";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";

@NgModule({
  declarations: [ClientComponent, OuvriersComponent, UtilisateursComponent, ClientModalComponent],
  entryComponents: [
    ClientModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PersonnesRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule,
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    BsModalService
  ]
})
export class PersonnesModule {
}
