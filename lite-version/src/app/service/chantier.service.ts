import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {ClientModel} from "../model/clientModel";
import {ChantierModel} from "../model/chantierModel";

@Injectable({
  providedIn: 'root'
})
export class ChantierService {
  apiUrl = environment.api_url + 'api/chantier';

  constructor(private authHttp: HttpClient) { }

  /*
  * recuperation des chantiers
   */
  async getAllChantier(): Promise<ChantierModel> {
    return new Promise<ChantierModel>(((resolve, reject) => {
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
