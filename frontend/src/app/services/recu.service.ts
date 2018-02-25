import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Recu} from '../models/recu';
import {Observable} from 'rxjs/Observable';
import {UtilitairesService} from './utilitaires.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RecuService {

  private url = '';

  constructor(private authHttp: AuthHttp) {
  }

  createRecu(recu: Recu): Observable<Recu> {
    const corps = JSON.stringify(recu);
    return this.authHttp.post(this.url, corps, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  getAllRecus(): Observable<Recu[]> {
    return this.authHttp.get(this.url, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  getRecuById(id: number): Observable<Recu> {
    return this.authHttp.get(`${this.url}${id}/`, null).map(UtilitairesService.extractData)
      .catch(UtilitairesService.handleError);
  }

  updateRecu(recu: Recu): Observable<Recu> {
    const corps = JSON.stringify(recu);
    return this.authHttp.put(`${this.url}${recu.id}/`, corps, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  delRecuById(id: number): Observable<Recu> {
    return this.authHttp.delete(`${this.url}${id}/`, null).map(UtilitairesService.extractData)
      .catch(UtilitairesService.handleError);
  }

}
