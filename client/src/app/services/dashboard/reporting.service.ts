import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Reporting} from "../../model/reporting";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  apiUrl = environment.api_url + 'api/reporting';

  constructor(private http: HttpClient) {
  }

  getReporting(): Observable<Reporting> {
    return this.http.get<Reporting>(`${this.apiUrl}`);
  }
}
