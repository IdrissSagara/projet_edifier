import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Mouvement} from '../models/movement';
import {Observable} from 'rxjs/Observable';
import {UtilitairesService} from './utilitaires.service';

@Injectable()
export class MouvementService {

  private url = '';

  constructor(private authHttp: AuthHttp) {
  }

  createMouvement(mouvement: Mouvement): Observable<Mouvement> {
    const corps = JSON.stringify(mouvement);
    return this.authHttp.post(this.url, corps, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  getAllMouvements(): Observable<Mouvement[]> {
    return this.authHttp.get(this.url, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  getMouvementById(id: number): Observable<Mouvement> {
    return this.authHttp.get(`${this.url}${id}/`, null).map(UtilitairesService.extractData)
      .catch(UtilitairesService.handleError);
  }

  updateMouvement(mouvement: Mouvement): Observable<Mouvement> {
    const corps = JSON.stringify(mouvement);
    return this.authHttp.put(`${this.url}${mouvement.id}/`, corps, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  delMouvementById(id: number): Observable<Mouvement> {
    return this.authHttp.delete(`${this.url}${id}/`, null).map(UtilitairesService.extractData)
      .catch(UtilitairesService.handleError);
  }

}
