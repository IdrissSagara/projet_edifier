import {Component, OnInit} from '@angular/core';
import {navItems} from '../../_nav';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {SpinnerService} from "../../services/spinner.service";
import {Utilisateur} from "../../model/utilisateur";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  currentUser: Utilisateur;

  constructor(private authService: AuthService, private router: Router, private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.authService.getMe().pipe(first()).subscribe((res) => {
      this.currentUser = res;
    }, error => {
    }, () => {
      this.spinner.hide();
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
