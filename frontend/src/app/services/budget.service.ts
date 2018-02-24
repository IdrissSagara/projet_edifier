import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Budget} from '../models/budget';
import {Observable} from 'rxjs/Observable';
import {UtilitairesService} from './utilitaires.service';

@Injectable()
export class BudgetService {

  private url = '';

  constructor(private authHttp: AuthHttp) {
  }

  createBudget(budget: Budget): Observable<Budget> {
    const corps = JSON.stringify(budget);
    return this.authHttp.post(this.url, corps, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  getAllBudgets(): Observable<Budget[]> {
    return this.authHttp.get(this.url, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  getBudgetById(id: number): Observable<Budget> {
    return this.authHttp.get(`${this.url}${id}/`, null).map(UtilitairesService.extractData)
      .catch(UtilitairesService.handleError);
  }

  updateBudget(budget: Budget): Observable<Budget> {
    const corps = JSON.stringify(budget);
    return this.authHttp.put(`${this.url}${budget.id}/`, corps, UtilitairesService.getDefaultRequestOptions())
      .map(UtilitairesService.extractData).catch(UtilitairesService.handleError);
  }

  delBudgetById(id: number): Observable<Budget> {
    return this.authHttp.delete(`${this.url}${id}/`, null).map(UtilitairesService.extractData)
      .catch(UtilitairesService.handleError);
  }

}
