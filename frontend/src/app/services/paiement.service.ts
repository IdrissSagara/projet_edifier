import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Paiement} from '../models/paiement';
import {Observable} from 'rxjs/Observable';
import {UtilitairesService} from './utilitaires.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class PaiementService {

  private url = '';

  constructor(private authHttp: AuthHttp) {
  }

  createPaiement(paiement: Paiement): Observable<Paiement> {
    const corps = JSON.stringify(paiement);
    return this.authHttp.post(this.url, corps, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  getAllPaiements(): Observable<Paiement[]> {
    return this.authHttp.get(this.url, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  getPaiementById(id: number): Observable<Paiement> {
    return this.authHttp.get(`${this.url}${id}/`, null).map(UtilitairesService.extractData)
      .catch(UtilitairesService.handleError);
  }

  updatePaiement(paiement: Paiement): Observable<Paiement> {
    const corps = JSON.stringify(paiement);
    return this.authHttp.put(`${this.url}${paiement.id}/`, corps, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  delPaiementById(id: number): Observable<Paiement> {
    return this.authHttp.delete(`${this.url}${id}/`, null).map(UtilitairesService.extractData)
      .catch(UtilitairesService.handleError);
  }

}
