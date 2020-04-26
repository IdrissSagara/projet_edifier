import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AllClientsResponse} from "../model/responses/AllClientsResponse";
import {Observable} from "rxjs";
import {Client} from "../../../../backend-node/models/client";
import {ClientModel} from "../model/clientModel";


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  apiUrl = environment.api_url + 'api/client';

  constructor(private httpClient: HttpClient) {
  }
  // recuperation des clients
  getAllClient(offset = 0): Observable<AllClientsResponse> {
    return this.httpClient.get<AllClientsResponse>(`${this.apiUrl}?offset=${offset}`);
  }

  addClient(chantier): Observable<Client> {
    return this.httpClient.post<Client>(`${this.apiUrl}`, chantier);
  }

  search(nom): Observable<AllClientsResponse> {
    return this.httpClient.get<AllClientsResponse>(`${this.apiUrl}/search?nom=${nom}`);
  }

  getClientById(id: number) {
    return this.httpClient.get<ClientModel>(`${this.apiUrl}/${id}`);
  }

}
