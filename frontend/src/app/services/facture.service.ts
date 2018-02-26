import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Facture} from '../models/facture';
import {Observable} from 'rxjs/Observable';
import {UtilitairesService} from './utilitaires.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class FactureService {

  private url = '';

  constructor(private authHttp: AuthHttp) {
  }

  createFacture(facture: Facture): Observable<Facture> {
    const corps = JSON.stringify(facture);
    return this.authHttp.post(this.url, corps, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  getAllFactures(): Observable<Facture[]> {
    return this.authHttp.get(this.url, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  getFactureById(id: number): Observable<Facture> {
    return this.authHttp.get(`${this.url}${id}/`, null).map(UtilitairesService.extractData)
      .catch(UtilitairesService.handleError);
  }

  updateFacture(facture: Facture): Observable<Facture> {
    const corps = JSON.stringify(facture);
    return this.authHttp.put(`${this.url}${facture.id}/`, corps, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  delFactureById(id: number): Observable<Facture> {
    return this.authHttp.delete(`${this.url}${id}/`, null).map(UtilitairesService.extractData)
      .catch(UtilitairesService.handleError);
  }

}
