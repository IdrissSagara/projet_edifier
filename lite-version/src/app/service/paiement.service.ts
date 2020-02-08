import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  apiUrl = environment.api_url + 'api/paiements';

  constructor(private httpClient: HttpClient) { }

  async getAllPaiements(): Promise<any> {
    return new Promise(((resolve, reject) => {
      this.httpClient.get(`${this.apiUrl}`, {responseType: 'json'}).toPromise().then( res => {
        console.log("response of getAllPaiements: ");
        console.log(res);
        resolve(res);
        }, err => {
          console.error('getAllPaiements: ');
          console.error(err);
          reject(err);
        });
    }));
  }
}
