import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Agence} from "../model/agence";

@Injectable({
  providedIn: 'root'
})
export class AgenceService {
  private _Agence: Agence;
  apiUrl = environment.api_url + 'api/agence';

  constructor(private httpClient: HttpClient) {
  }

  getOrCreateAgence(agence): Observable<Agence> {
    return this.httpClient.post<Agence>(`${this.apiUrl}`, agence);
  }

  updateAgence(agence): Observable<Agence> {
    return this.httpClient.put<Agence>(`${this.apiUrl}`, agence);
  }

  getAgenceById(id: number) {
    return this.httpClient.get<Agence>(`${this.apiUrl}/${id}`);
  }

  getAgence(): Observable<Agence> {
    return this.httpClient.get<Agence>(`${this.apiUrl}`);
  }

}
