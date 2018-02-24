import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Client} from '../models/client';
import {Observable} from 'rxjs/Observable';
import {UtilitairesService} from './utilitaires.service';

@Injectable()
export class ClientService {

  private url = '';

  constructor(private authHttp: AuthHttp) {
  }

  createClient(client: Client): Observable<Client> {
    const corps = JSON.stringify(client);
    return this.authHttp.post(this.url, corps, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  getAllClients(): Observable<Client[]> {
    return this.authHttp.get(this.url, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  getClientById(id: number): Observable<Client> {
    return this.authHttp.get(`${this.url}${id}/`, null).map(UtilitairesService.extractData)
      .catch(UtilitairesService.handleError);
  }

  updateClient(client: Client): Observable<Client> {
    const corps = JSON.stringify(client);
    return this.authHttp.put(`${this.url}${client.id}/`, corps, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  delClientById(id: number): Observable<Client> {
    return this.authHttp.delete(`${this.url}${id}/`, null).map(UtilitairesService.extractData)
      .catch(UtilitairesService.handleError);
  }

}
