import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {AllPaiementResponse} from "../model/responses/AllPaiementResponse";
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  apiUrl = environment.api_url + 'api/paiement';


  constructor(private http: HttpClient) {
  }

  async getAllPaiement(offset = 0): Promise<AllPaiementResponse> {
    return new Promise<AllPaiementResponse>(((resolve, reject) => {
      this.http.get(`${this.apiUrl}/all?offset=${offset}`, {responseType: 'text'}).toPromise().then(res => {
          resolve(JSON.parse(res));
        }, rej => {
          reject(rej);
        }
      );
    }));
  }

  async getPaimentById(id: number): Promise<any> {
    return new Promise<any>(((resolve, reject) => {
      this.http.get(`${this.apiUrl}/chantier/${id}`, {responseType: 'text'}).toPromise().then(
        res => {
          resolve(JSON.parse(res));
        }, rej => {
          reject(rej);
        }
      );
    }));
  }


  /*       getPaimentFacture(idFacture: number): Promise<any> {
          return new Promise<any>(((resolve, reject) => {
            this.http.get(`${this.apiUrl}/${idFacture}/facture`, {responseType: "blob"}).toPromise().then(
              res => {
                return res;
              }, rej => {
                reject(rej);
              }
            );
          }));
        }*/

  /*  private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
    }*/


  getPaimentFacture(idFacture: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idFacture}/facture`, {responseType: "arraybuffer"});
  }

}
