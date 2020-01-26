import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {ClientModel} from '../model/clientModel';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private authHttp: HttpClient) { }
  // recuperation des clients
  async getAllClient(): Promise<ClientModel> {
    return new Promise<ClientModel>(((resolve, reject) => {
      this.authHttp.get(`/api/client/`, {responseType: 'text'}).toPromise().then(
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
    return this.authHttp.post( `/api/client`, P, {
      observe: 'response',
      responseType: 'text',
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    }).toPromise();
  }


}
