import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Chantier} from '../model/chantier';
import {AllChantierResponse} from "../model/responses/AllChantierResponse";

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
  async getAllChantier(offset = 0): Promise<AllChantierResponse> {
    return new Promise<AllChantierResponse>(((resolve, reject) => {
      this.http.get(`${this.apiUrl}?offset=${offset}`, {responseType: 'text'}).toPromise().then(res => {
          resolve(JSON.parse(res));
        }, rej => {
          reject(rej);
        }
      );
    }));
  }

  async getChantierById(id: string): Promise<any> {
    return new Promise<any>(((resolve, reject) => {
      this.http.get(`${this.apiUrl}`, {responseType: 'text'}).toPromise().then(
        res => {
          resolve(JSON.parse(res));
        }, rej => {
          reject(rej);
        }
      );
    }));
  }

  /**
   * service de suppression d'un chantier par son id
   * @param id
   */
  deleteChantierById(id: number): Promise<Chantier> {
    return new Promise<Chantier>(((resolve, reject) => {
      this.http.delete(`${this.apiUrl}/${id}`, {responseType: 'text'}).toPromise().then(
        res => {
          resolve(JSON.parse(res));
        }, rej => {
          reject(rej);
        }
      );
    }));
  }

  /**
   * service de modification d'un chantier
   * @param params
   */
  updateChantier(params): Promise<HttpResponse<string>> {
    const P = new HttpParams({fromObject: params});
    return this.http.put(`${this.apiUrl}`, P, {
      observe: 'response',
      responseType: 'text',
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    }).toPromise();
  }




  /**
   * Ajout d'un chantier
   * @param params
   */
  addChantier(params): Promise<HttpResponse<string>> {
    const P = new HttpParams( {fromObject: params} );
    return this.http.post(`${this.apiUrl}`, P, {
      observe: 'response',
      responseType: 'text',
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    }).toPromise();
  }



}
