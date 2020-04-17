import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  username;
  password;
  errorMessage;

  constructor(private authService: AuthService, private router: Router, private spinner: SpinnerService,
              private route: ActivatedRoute) {
  }

  // redirect user to his url after login
  // https://jasonwatmore.com/post/2016/12/08/angular-2-redirect-to-previous-url-after-login-with-auth-guard
  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // {order: "popular"}

        this.returnUrl = params.returnUrl;
        console.log(this.returnUrl); // popular
      });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log(this.returnUrl);
    if (this.authService.isloggedIn()) {
      this.router.navigateByUrl(this.returnUrl);
      console.log('Vous êtes déjà authentifié');
    }
  }

  login() {
    this.errorMessage = '';
    this.spinner.show();
    this.authService.login(this.username, this.password).then(r => {
      // login successful so redirect to return url
      this.router.navigateByUrl(this.returnUrl);
    }).catch(err => {
      console.log('oops during login');
      console.log(err);
      this.errorMessage = err.error.error;
    }).finally(() => {
      this.spinner.hide();
    });
  }
}
