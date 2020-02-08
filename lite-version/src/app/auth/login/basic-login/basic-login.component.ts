import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {

  username;
  password;
  errorMessage;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isloggedIn()) {
      this.router.navigate(['']);
    }
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
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
