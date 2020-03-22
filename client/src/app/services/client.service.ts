import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Client} from '../model/client';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  apiUrl = environment.api_url + 'api/client';

  constructor(private authHttp: HttpClient) { }
  // recuperation des clients
  async getAllClient(): Promise<Client[]> {
    return new Promise<Client[]>(((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}`, {responseType: 'text'}).toPromise().then(
        res => {
          resolve(JSON.parse(res));
        }, rej => {
          reject(rej);
        }
      );
    }));
  }

  addClient(params: {[key: string]: string}): Promise<HttpResponse<string>> {
    const P = new HttpParams( {fromObject: params} );
    return this.authHttp.post( `${this.apiUrl}`, P, {
      observe: 'response',
      responseType: 'text',
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    }).toPromise();
  }


}
