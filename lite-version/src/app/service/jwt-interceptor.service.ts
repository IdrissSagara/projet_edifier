import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }
// https://jasonwatmore.com/post/2019/08/06/angular-8-role-based-authorization-tutorial-with-example
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    // const currentUser = this.authService.currentUserValue;
    // const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith(environment.api_url); // le chien qui se mort la queue; authentification passe par api aussi
    if (this.authService.isloggedIn() && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      });
    }

    return next.handle(request);
  }
}
