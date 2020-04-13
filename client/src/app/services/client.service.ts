import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AllClientsResponse} from "../model/responses/AllClientsResponse";


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  apiUrl = environment.api_url + 'api/client';

  constructor(private httpClient: HttpClient) {
  }
  // recuperation des clients
  async getAllClient(offset = 0): Promise<AllClientsResponse> {
    return new Promise<AllClientsResponse>(((resolve, reject) => {
      this.httpClient.get(`${this.apiUrl}?offset=${offset}`, {responseType: 'text'}).toPromise().then(
        res => {
          resolve(JSON.parse(res));
        }, rej => {
          reject(rej);
        }
      );
    }));
  }

  addClient(params): Promise<HttpResponse<string>> {
    const P = new HttpParams( {fromObject: params} );
    return this.httpClient.post(`${this.apiUrl}`, P, {
      observe: 'response',
      responseType: 'text',
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    }).toPromise();
  }


}
