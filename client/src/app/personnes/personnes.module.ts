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

@NgModule({
  declarations: [ClientComponent, OuvriersComponent, UtilisateursComponent, ClientModalComponent, OuvrierModalComponent],
  entryComponents: [
    ClientModalComponent,
    OuvrierModalComponent
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
    ModalModule.forRoot()
  ],
  providers: [
    BsModalService
  ]
})
export class PersonnesModule {
}
