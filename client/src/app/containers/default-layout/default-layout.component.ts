import {Component, OnInit} from '@angular/core';
import {navItems} from '../../_nav';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SpinnerService} from "../../services/spinner.service";
import {USER_ROLES, Utilisateur} from "../../model/utilisateur";
import {UserResolver} from "../../resolvers/user.resolver";
import {NavEnum} from "../../_nav-enum";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  providers: [UserResolver]
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  currentDate: Date;
  backendUrl: string = environment.backend_base;

  constructor(readonly authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute,
              private spinner: SpinnerService) {

    this.navItems = navItems.filter(it => this.authService.getRole() !== USER_ROLES.BASICUSER || it.name !== NavEnum.Utilisateurs);
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { currentUser: Utilisateur }) => {
      this.authService._utilisateurCourant = data.currentUser;
    });
    this.currentDate = new Date();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logOut() {
    this.spinner.show();
    this.authService.logout();
    this.spinner.hide();
    this.router.navigate(['/login']);
  }
}
