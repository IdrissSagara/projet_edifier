import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AllChantierPictures} from "../model/responses/AllChantierPictures";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  apiUrl = environment.api_url + 'api/chantier';

  constructor(private http: HttpClient) {
  }

  uploadPictures(file: File, idChantier: number): Observable<any> {
    const formData: FormData = new FormData();
    const req = new HttpRequest('POST', `${this.apiUrl}/photo/${idChantier}/multiple`, formData,
      {reportProgress: true, responseType: 'json'});
    return this.http.request(req);
  }

  getPictures(idChantier: number): Observable<AllChantierPictures> {
    return this.http.get<AllChantierPictures>(`${this.apiUrl}/photo/${idChantier}`);
  }

}
