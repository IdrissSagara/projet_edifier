import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  username;
  password;
  errorMessage;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isloggedIn()) {
      this.router.navigate(['']);
      console.log('Vous êtes déjà authentifié');
    }
  }

  login() {
    this.errorMessage = '';
    this.authService.login(this.username, this.password).then(r => {
      console.log("this is the result of login");
      console.log(r);
      // if the returned body is not empty then redirect otherwise do nothing
      this.router.navigate(['dashboard']);
    }).catch(err => {
      console.log('oops during login');
      console.log(err);
      this.errorMessage = err.error.error;
    });
  }
}
