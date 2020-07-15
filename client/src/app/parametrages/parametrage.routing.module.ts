import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AgenceComponent} from "./agence/agence.component";
import {Role} from "../personnes/utilisateurs/user.roles";
import {RoleGuard} from "../authentication/guards/role.guard";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Parametrages'
    },
    children: [
      {
        path: '',
        redirectTo: 'agence'
      },
      {
        path: 'agence',
        component: AgenceComponent,
        canActivate: [RoleGuard],
        data: {
          title: 'Agence',
          roles: [Role.Admin, Role.AdvancedUser]
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
