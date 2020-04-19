import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AllMouvementResponse} from "../model/responses/AllMouvementResponse";
import {Observable} from "rxjs";
import {Mouvement} from "../model/mouvement";

@Injectable({
  providedIn: 'root'
})
export class MouvementService {
  apiUrl = environment.api_url + 'api/mouvement';

  constructor(private http: HttpClient) {
  }

  getAllMouvement(offset = 0): Observable<AllMouvementResponse> {
    return this.http.get<AllMouvementResponse>(`${this.apiUrl}?offset=${offset}`);
  }

  getMouvementById(id: number) {
    return this.http.get<Mouvement>(`${this.apiUrl}/${id}`);
  }

  addMouvement(mouvement): Observable<Mouvement> {
    return this.http.post<Mouvement>(`${this.apiUrl}`, mouvement);
  }
}
