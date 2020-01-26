import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {UtilService} from './util.service';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
      this.handleToken(res);
    });
  }

  /**
   * Renvoie le token JWT
   */
  getToken(): string {
    return localStorage.getItem(environment.jwt_token_name);
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
    return this.getToken() !== null;
  }

  logout() {
    // remove user from local storage to log user out
    // TODO: Faire un truc coté serveur ou pas du tout
    localStorage.removeItem(environment.jwt_token_name);
    //this._utilisateurCourant = null;
  }
}
