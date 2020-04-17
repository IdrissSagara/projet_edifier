import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  username;
  password;
  errorMessage;

  constructor(private authService: AuthService, private router: Router, private spinner: SpinnerService) {
  }

  ngOnInit() {
    if (this.authService.isloggedIn()) {
      this.router.navigate(['']);
      console.log('Vous êtes déjà authentifié');
    }
  }

  login() {
    this.errorMessage = '';
    this.spinner.show();
    this.authService.login(this.username, this.password).then(r => {
      this.router.navigate(['dashboard']);
    }).catch(err => {
      console.log('oops during login');
      console.log(err);
      this.errorMessage = err.error.error;
    }).finally(() => {
      this.spinner.hide();
    });
  }
}
