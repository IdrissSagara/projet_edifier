import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AllOuvrierResponse} from "../model/responses/AllOuvrierResponse";
import {environment} from "../../environments/environment";
import {Ouvrier} from "../model/ouvrier";

@Injectable({
  providedIn: 'root'
})
export class OuvrierService {

  apiUrl = environment.api_url + 'api/ouvrier';

  constructor(private http: HttpClient) {
  }

  getAllOuvrier(): Observable<AllOuvrierResponse> {
    return this.http.get<AllOuvrierResponse>(`${this.apiUrl}`);
  }

  getOuvrierById(id: number) {
    return this.http.get<Ouvrier>(`${this.apiUrl}/${id}`);
  }

  updateOuvrier(ouvrier): Observable<Ouvrier> {
    return this.http.put<Ouvrier>(`${this.apiUrl}`, ouvrier);
  }

}
