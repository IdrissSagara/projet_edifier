import {Component, OnInit} from '@angular/core';
import {navItems} from '../../_nav';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SpinnerService} from "../../services/spinner.service";
import {Utilisateur} from "../../model/utilisateur";
import {UserResolver} from "../../resolvers/user.resolver";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  providers: [UserResolver]
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  currentUser: Utilisateur;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute,
              private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { currentUser: Utilisateur }) => {
      this.authService._utilisateurCourant = data.currentUser;
    });
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
