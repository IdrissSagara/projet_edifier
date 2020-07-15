import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientComponent} from './client/client.component';
import {OuvriersComponent} from './ouvriers/ouvriers.component';
import {UtilisateursComponent} from './utilisateurs/utilisateurs.component';
import {FormsModule} from "@angular/forms";
import {PersonnesRoutingModule} from "./personnes.routing.module";
import {ClientModalComponent} from "./client/client-modal/client-modal.component";
import {OuvrierModalComponent} from "./ouvriers/ouvrier-modal/ouvrier-modal.component";
import {OuvrierDetailsComponent} from './ouvriers/ouvrier-details/ouvrier-details.component';
import {AddOuvrierToChantierModalComponent} from './ouvriers/add-ouvrier-to-chantier-modal/add-ouvrier-to-chantier-modal.component';
import {NgxSelectModule} from "ngx-select-ex";
import {AlertModule} from "ngx-bootstrap/alert";
import {ClientDetailsComponent} from './client/client-details/client-details.component';
import {UtilisateurModalComponent} from './utilisateurs/utilisateur-modal/utilisateur-modal.component';
import {DetailUtilisateurComponent} from './utilisateurs/detail-utilisateur/detail-utilisateur.component';
import {ChangePasswordModalComponent} from './utilisateurs/change-password-modal/change-password-modal.component';
import {ShowHideModule} from "../authentication/show-hide/show-hide.module";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TabsModule} from "ngx-bootstrap/tabs";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {PopoverModule} from "ngx-bootstrap/popover";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {BsModalService, ModalModule} from "ngx-bootstrap/modal";
import {ClientResolver} from "../resolvers/clients.resolver";

@NgModule({
  declarations: [
    ClientComponent,
    OuvriersComponent,
    UtilisateursComponent,
    ClientModalComponent,
    OuvrierModalComponent,
    OuvrierDetailsComponent,
    AddOuvrierToChantierModalComponent,
    ClientDetailsComponent,
    UtilisateurModalComponent,
    DetailUtilisateurComponent,
    ChangePasswordModalComponent,
  ],
  entryComponents: [
    ClientModalComponent,
    OuvrierModalComponent,
    AddOuvrierToChantierModalComponent,
    UtilisateurModalComponent,
    ChangePasswordModalComponent
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
    NgxSelectModule,
    ShowHideModule,
  ],
  providers: [
    BsModalService, ClientResolver
  ]
})
export class PersonnesModule {
}
