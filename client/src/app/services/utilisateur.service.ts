import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AllUsersResponse} from "../model/responses/AllUsersResponse";
import {Utilisateur} from "../model/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  apiUrl = environment.api_url + 'api/utilisateur';

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<AllUsersResponse> {
    return this.http.get<AllUsersResponse>(`${this.apiUrl}`);
  }

  getUserById(id: number) {
    return this.http.get<Utilisateur>(`${this.apiUrl}/${id}`);
  }

  updateUser(utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.apiUrl}`, utilisateur);
  }

}
