import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Agence} from "../model/agence";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AgenceService {
  private _Agence: Agence;
  apiUrl = environment.api_url + 'api/agence';

  constructor(private httpClient: HttpClient) {
  }

  insertOrUpdate(agence: FormData): Observable<boolean> {

    return this.httpClient.post<boolean>(`${this.apiUrl}`, agence);
  }

  getAgence(): Observable<Agence> {
    return this.httpClient.get<Agence>(`${this.apiUrl}`).pipe(map(agences => agences[0]));
  }

}
