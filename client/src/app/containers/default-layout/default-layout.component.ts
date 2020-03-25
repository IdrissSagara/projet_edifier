import {Component} from '@angular/core';
import {navItems} from '../../_nav';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(private authService: AuthService, private router: Router) {
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
