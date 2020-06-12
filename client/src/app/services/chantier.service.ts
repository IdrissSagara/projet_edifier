import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Chantier} from '../model/chantier';
import {AllChantierResponse} from "../model/responses/AllChantierResponse";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChantierService {
  apiUrl = environment.api_url + 'api/chantier';

  constructor(private http: HttpClient) {
  }

  /*
  * recuperation des chantiers
   */
  getAllChantier(offset = 0) {
    return this.http.get<AllChantierResponse>(`${this.apiUrl}?offset=${offset}`);
  }

  getChantierById(id: number): Observable<Chantier> {
    return this.http.get<Chantier>(`${this.apiUrl}/${id}`);
  }

  /**
   * service de suppression d'un chantier par son id
   * @param id
   */
  deleteChantierById(id: number) {
    return this.http.delete<Chantier>(`${this.apiUrl}/${id}`);
  }

  /**
   * service de modification d'un chantier
   * @param chantier
   */
  updateChantier(chantier): Observable<Chantier> {
    return this.http.put<Chantier>(`${this.apiUrl}`, chantier);
  }

  /**
   * Ajout d'un chantier
   * @param chantier
   */
  addChantier(chantier: Chantier): Observable<Chantier> {
    return this.http.post<Chantier>(`${this.apiUrl}`, chantier)
      .pipe(catchError<any, any>(this.handleError));
  }

  getChantierFacture(idFacture: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idFacture}/facture`, {responseType: "arraybuffer"});
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
