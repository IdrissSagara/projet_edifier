import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AllUsersResponse} from "../model/responses/AllUsersResponse";
import {Utilisateur} from "../model/utilisateur";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  apiUrl = environment.api_url + 'api/utilisateur';
  urlSaveUser = environment.api_url + 'auth/register';
  passwordUpdateUrl = environment.api_url + 'auth/reset-password';

  constructor(private http: HttpClient) {
  }

  getAllUsers(offset = 0): Observable<AllUsersResponse> {
    return this.http.get<AllUsersResponse>(`${this.apiUrl}?offset=${offset}`);
  }

  getUserById(id: number) {
    return this.http.get<Utilisateur>(`${this.apiUrl}/${id}`);
  }

  updateUser(utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.apiUrl}`, utilisateur);
  }

  createUser(utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.urlSaveUser}`, utilisateur)
      .pipe(catchError<any, any>(this.handleError));
  }

  deleteUserById(id: number): Observable<Utilisateur> {
    return this.http.delete<Utilisateur>(`${this.apiUrl}/${id}`);
  }

  changePassword(utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.passwordUpdateUrl}`, utilisateur);
  }

  handleError(error) {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
