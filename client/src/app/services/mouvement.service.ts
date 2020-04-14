import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {AllMouvementResponse} from "../model/responses/AllMouvementResponse";

@Injectable({
  providedIn: 'root'
})
export class MouvementService {
  apiUrl = environment.api_url + 'api/mouvement';

  constructor(private http: HttpClient) {
  }

  async getAllMouvement(offset = 0): Promise<AllMouvementResponse> {
    return new Promise<AllMouvementResponse>(((resolve, reject) => {
      this.http.get(`${this.apiUrl}?offset=${offset}`, {responseType: 'text'}).toPromise().then(res => {
          resolve(JSON.parse(res));
        }, rej => {
          reject(rej);
        }
      );
    }));
  }


  async getMouvementById(id: number): Promise<any> {
    return new Promise<any>(((resolve, reject) => {
      this.http.get(`${this.apiUrl}/${id}`, {responseType: 'text'}).toPromise().then(
        res => {
          resolve(JSON.parse(res));
        }, rej => {
          reject(rej);
        }
      );
    }));
  }

  addMouvement(params): Promise<HttpResponse<string>> {
    const P = new HttpParams({fromObject: params});
    return this.http.post(`${this.apiUrl}`, P, {
      observe: 'response',
      responseType: 'text',
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    }).toPromise();
  }
}
