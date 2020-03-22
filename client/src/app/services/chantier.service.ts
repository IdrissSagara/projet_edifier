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

  constructor(private authHttp: HttpClient) { }

  /*
  * recuperation des chantiers
   */
  async getAllChantier(): Promise<AllChantierResponse> {
    return new Promise<AllChantierResponse>(((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}`, {responseType: 'text'}).toPromise().then(res => {
          resolve(JSON.parse(res));
        }, rej => {
          reject(rej);
        }
      );
    }));
  }

  async getChantierById(id: string): Promise<any> {
    return new Promise<any>(((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}`, {responseType: 'text'}).toPromise().then(
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
  deleteClientById(id: number): Promise<Chantier> {
    return new Promise<Chantier>(((resolve, reject ) => {
      this.authHttp.delete(`${this.apiUrl}/${id}`, {responseType: 'text'}).toPromise().then(
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
  updateChantier(params: {[key: string]: string}): Promise<HttpResponse<string>> {
    const P = new HttpParams( {fromObject: params} );
    return this.authHttp.put( `${this.apiUrl}`, P, {
      observe: 'response',
      responseType: 'text',
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    }).toPromise();
  }




  /**
   * Ajout d'un chantier
   * @param params
   */
  addChantier(params: {[key: string]: string}): Promise<HttpResponse<string>> {
    const P = new HttpParams( {fromObject: params} );
    return this.authHttp.post( `${this.apiUrl}`, P, {
      observe: 'response',
      responseType: 'text',
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    }).toPromise();
  }



}
