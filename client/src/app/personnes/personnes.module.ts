import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientComponent} from './client/client.component';
import {OuvriersComponent} from './ouvriers/ouvriers.component';
import {UtilisateursComponent} from './utilisateurs/utilisateurs.component';
import {FormsModule} from "@angular/forms";
import {
  BsDropdownModule,
  BsModalService,
  CarouselModule,
  CollapseModule,
  ModalModule,
  PaginationModule,
  PopoverModule,
  ProgressbarModule,
  TabsModule,
  TooltipModule
} from "ngx-bootstrap";
import {PersonnesRoutingModule} from "./personnes.routing.module";
import {ClientModalComponent} from "./client/client-modal/client-modal.component";
import {OuvrierModalComponent} from "./ouvriers/ouvrier-modal/ouvrier-modal.component";
import {OuvrierDetailsComponent} from './ouvriers/ouvrier-details/ouvrier-details.component';
import {AddOuvrierToChantierModalComponent} from './ouvriers/add-ouvrier-to-chantier-modal/add-ouvrier-to-chantier-modal.component';
import {NgxSelectModule} from "ngx-select-ex";
import {AlertModule} from "ngx-bootstrap/alert";
import {ClientDetailsComponent} from './client/client-details/client-details.component';

@NgModule({
  declarations: [ClientComponent, OuvriersComponent, UtilisateursComponent, ClientModalComponent, OuvrierModalComponent, OuvrierDetailsComponent, AddOuvrierToChantierModalComponent, ClientDetailsComponent],
  entryComponents: [
    ClientModalComponent,
    OuvrierModalComponent,
    AddOuvrierToChantierModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PersonnesRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    NgxSelectModule
  ],
  providers: [
    BsModalService
  ]
})
export class PersonnesModule {
}
