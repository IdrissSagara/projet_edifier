import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Chantier} from '../models/chantier';
import {Observable} from 'rxjs/Observable';
import {UtilitairesService} from './utilitaires.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ChantierService {

  private url = '';

  constructor(private authHttp: AuthHttp) {
  }

  createChantier(chantier: Chantier): Observable<Chantier> {
    const corps = JSON.stringify(chantier);
    return this.authHttp.post(this.url, corps, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  getAllChantiers(): Observable<Chantier[]> {
    return this.authHttp.get(this.url, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  getChantierById(id: number): Observable<Chantier> {
    return this.authHttp.get(`${this.url}${id}/`, null).map(UtilitairesService.extractData)
      .catch(UtilitairesService.handleError);
  }

  updateChantier(chantier: Chantier): Observable<Chantier> {
    const corps = JSON.stringify(chantier);
    return this.authHttp.put(`${this.url}${chantier.id}/`, corps, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  delChantierById(id: number): Observable<Chantier> {
    return this.authHttp.delete(`${this.url}${id}/`, null).map(UtilitairesService.extractData)
      .catch(UtilitairesService.handleError);
  }

}
