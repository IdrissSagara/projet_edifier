import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SpinnerService} from "../../services/spinner.service";
import {ShowHidePasswordDirective} from "../show-hide-password.directive";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  username;
  password;
  errorMessage;
  submitting: boolean = false;

  showPassword = false;
  @ViewChild(ShowHidePasswordDirective) input: ShowHidePasswordDirective;
  @ViewChild('toggler') myToggler: ElementRef;

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
    this.submitting = true;
    this.authService.login(this.username, this.password).then(r => {
      // login successful so redirect to return url
      this.router.navigateByUrl(this.returnUrl);
    }).catch(err => {
      console.log('oops during login');
      console.log(err);
      this.errorMessage = err.error.message;
      console.log("this.errorMessage");
      console.log(this.errorMessage);
    }).finally(() => {
      this.spinner.hide();
      this.submitting = false;
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    let iElt;
    if (this.showPassword) {
      this.input.changeType('text');
      iElt = this.myToggler.nativeElement.childNodes[0];
      iElt.classList.replace('fa-eye', 'fa-eye-slash');
      iElt.parentNode.parentNode.setAttribute('title', 'Cacher');
    } else {
      this.input.changeType('password');
      iElt = this.myToggler.nativeElement.childNodes[0];
      iElt.classList.replace('fa-eye-slash', 'fa-eye');
      iElt.parentNode.parentNode.setAttribute('title', 'Afficher');
    }
  }
}
