import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {
  BsDropdownModule,
  CarouselModule,
  CollapseModule,
  PaginationModule,
  PopoverModule,
  ProgressbarModule,
  TabsModule,
  TooltipModule
} from "ngx-bootstrap";
import {ChantierRoutingModule} from "./chantier.routing.module";
import {ChantierComponent} from "./chantier.component";


@NgModule({
  declarations: [
    ChantierComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChantierRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot()
  ]
})
export class ChantierModule {
}
