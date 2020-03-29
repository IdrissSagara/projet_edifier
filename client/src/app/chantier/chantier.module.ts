import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {
  BsModalRef,
  CollapseModule,
  ModalModule,
  PaginationModule,
  PopoverModule,
  ProgressbarModule,
  TabsModule,
  TooltipModule
} from "ngx-bootstrap";
import {ChantierRoutingModule} from "./chantier.routing.module";
import {ChantierComponent} from "./chantier.component";
import {ChantierModalComponent} from './chantier-modal/chantier-modal.component';


@NgModule({
  declarations: [
    ChantierComponent,
    ChantierModalComponent,
  ],
  entryComponents: [
    ChantierModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChantierRoutingModule,
    TabsModule,
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    BsModalRef,
  ]
})
export class ChantierModule {
}
