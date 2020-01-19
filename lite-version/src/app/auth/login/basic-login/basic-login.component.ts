import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {

  username;
  password;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  login() {
      this.authService.login(this.username, this.password);
  }

}
