import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {UtilService} from './util.service';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jsonHelp = new JwtHelperService();
  get_token_endpoint = environment.api_url + 'auth/login/';

  /**
   * Instance de l'utilisateur courant qui sera renvoyé lorsque l'utilisateur a déjà été renvoyé une fois.
   * Permet d'éviter des appels
   */
  // private _utilisateurCourant: Utilisateur;

  constructor(private http: HttpClient) { }

  /**
   * Effectue le login de l'utilisateur
   * @param username
   * @param password
   * @returns {Observable<R|T>}
   */
  login(username: string, password: string) {
    const credentials = {
      username: username,
      password: password
    };

    // let request_body = JSON.stringify(credentials);

    const P = new HttpParams( {fromObject: credentials} );
    return this.http.post( this.get_token_endpoint, P, {
      observe: 'response',
      responseType: 'json',
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    }).toPromise().then(res => {
      const body = this.handleToken(res);
      console.log('this is the body returned by the login');
      return Promise.resolve(body);
    }).catch(err => {
      return Promise.reject(err);
    });
  }

  /**
   * Renvoie le token JWT
   */
  getToken(): string {
    return localStorage.getItem(environment.jwt_token_name);
  }

  getRole(): string {
    console.log(this.jsonHelp.decodeToken(localStorage.getItem(environment.jwt_token_name)));
    return this.jsonHelp.decodeToken(localStorage.getItem(environment.jwt_token_name)).role;
  }

  /**
   * Enregistre le token en storage
   * @param res
   * @returns {any|{}}
   */
  private handleToken(res: HttpResponse<object>) {

    const body = UtilService.extractData(res);
    localStorage.setItem(environment.jwt_token_name, body.token);
    // this._utilisateurCourant = body.user;

    return body;
  }

  /**
   * Check si le token de l'utilisateur est bien valide
   * @returns {boolean} Renvoie true si l'utilisateur est connecté
   */
  isloggedIn(): boolean {
    const tok = this.getToken();
    return tok !== null && !this.jsonHelp.isTokenExpired(tok);
  }

  logout() {
    // remove user from local storage to log user out
    // TODO: Faire un truc coté serveur ou pas du tout
    localStorage.removeItem(environment.jwt_token_name);
    //this._utilisateurCourant = null;
  }
}
