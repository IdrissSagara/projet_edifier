import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AllChantierPictures} from "../model/responses/AllChantierPictures";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  apiUrl = environment.api_url + 'api/chantier';

  constructor(private http: HttpClient) {
  }

  uploadPictures(files: FileList, idChantier: number): Observable<any> {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    return this.http.post(`${this.apiUrl}/photo/${idChantier}/multiple`, formData);
  }

  getPictures(idChantier: number): Observable<AllChantierPictures> {
    return this.http.get<AllChantierPictures>(`${this.apiUrl}/photo/${idChantier}/all`);
  }


}
