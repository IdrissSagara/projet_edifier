import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AllOuvrierResponse} from "../model/responses/AllOuvrierResponse";
import {environment} from "../../environments/environment";
import {Ouvrier} from "../model/ouvrier";
import {catchError} from "rxjs/operators";
import {ChantierWithOuvrier} from "../model/chantierOuvrier";

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

  addOuvrier(ouvrier: Ouvrier): Observable<Ouvrier> {
    return this.http.post<Ouvrier>(`${this.apiUrl}`, ouvrier)
      .pipe(catchError<any, any>(this.handleError));
  }

  addOuvrierInChantier(idOuvrier: number, idChantier: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${idOuvrier}/affecter?idChantier=${idChantier}`, '')
      .pipe(catchError<any, any>(this.handleError));
  }

  deleteOuvrierById(id: number) {
    return this.http.delete<Ouvrier>(`${this.apiUrl}/${id}`);
  }

  getChantierByOuvrier(idOuvrier: number): Observable<any> {
    return this.http.get<ChantierWithOuvrier>(`${this.apiUrl}/${idOuvrier}/chantiers`);
  }

  handleError(error) {
    let errorMessage = '';
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
