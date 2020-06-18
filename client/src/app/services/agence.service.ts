import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Agence} from "../model/agence";

@Injectable({
  providedIn: 'root'
})
export class AgenceService {
  apiUrl = environment.api_url + 'api/agence';

  constructor(private httpClient: HttpClient) {
  }

  getOrCreateAgence(agence): Observable<Agence> {
    return this.httpClient.post<Agence>(`${this.apiUrl}`, Agence);
  }

  updateAgence(agence): Observable<Agence> {
    return this.httpClient.put<Agence>(`${this.apiUrl}`, Agence);
  }

  getAgenceById(id: number) {
    return this.httpClient.get<Agence>(`${this.apiUrl}/${id}`);
  }

}
