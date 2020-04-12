import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AllMouvementResponse} from "../model/responses/AllMouvementResponse";

@Injectable({
  providedIn: 'root'
})
export class MouvementService {
  apiUrl = environment.api_url + 'api/mouvement';

  constructor(private http: HttpClient) {
  }

  async getAllMouvement(): Promise<AllMouvementResponse> {
    return new Promise<AllMouvementResponse>(((resolve, reject) => {
      this.http.get(`${this.apiUrl}`, {responseType: 'text'}).toPromise().then(res => {
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
}
