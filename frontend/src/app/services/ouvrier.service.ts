import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Ouvrier} from '../models/ouvrier';
import {Observable} from 'rxjs/Observable';
import {UtilitairesService} from './utilitaires.service';

@Injectable()
export class OuvrierService {

  private url = '';

  constructor(private authHttp: AuthHttp) {
  }

  createOuvrier(ouvrier: Ouvrier): Observable<Ouvrier> {
    const corps = JSON.stringify(ouvrier);
    return this.authHttp.post(this.url, corps, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  getAllOuvriers(): Observable<Ouvrier[]> {
    return this.authHttp.get(this.url, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  getOuvrierById(id: number): Observable<Ouvrier> {
    return this.authHttp.get(`${this.url}${id}/`, null).map(UtilitairesService.extractData)
      .catch(UtilitairesService.handleError);
  }

  updateOuvrier(ouvrier: Ouvrier): Observable<Ouvrier> {
    const corps = JSON.stringify(ouvrier);
    return this.authHttp.put(`${this.url}${ouvrier.id}/`, corps, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  delOuvrierById(id: number): Observable<Ouvrier> {
    return this.authHttp.delete(`${this.url}${id}/`, null).map(UtilitairesService.extractData)
      .catch(UtilitairesService.handleError);
  }

}
