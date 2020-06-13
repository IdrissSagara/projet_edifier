import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SpinnerService} from "../../services/spinner.service";
import {ShowHidePasswordDirective} from "../show-hide-password.directive";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  username: string;
  password: string;
  errorMessage: string;
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

        this.returnUrl = params.returnUrl;
      });
    if (this.authService.isloggedIn()) {
      this.router.navigateByUrl(this.returnUrl);
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
      this.password = '';
      this.errorMessage = err.error.message;
    }).finally(() => {
      this.spinner.hide();
      this.submitting = false;
    });
  }

  forgotPwd() {
    alert("Merci de contacter Digital Faso à contact@digital-faso.com");
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
