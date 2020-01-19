import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ClientModel} from '../model/clientModel';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private auHttp: HttpClient) { }


  async getAllClient(): Promise<ClientModel> {
    return new Promise<ClientModel>(((resolve, reject) => {
      this.auHttp.get(`/api/client/`, {responseType: 'text'}).toPromise().then(
        res => {
          resolve(JSON.parse(res));
        }, rej => {
          reject(rej);
        }
      );
    }));
  }


}
