import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AllOuvrierResponse} from "../model/responses/AllOuvrierResponse";
import {environment} from "../../environments/environment";
import {Ouvrier} from "../model/ouvrier";
import {catchError} from "rxjs/operators";

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
