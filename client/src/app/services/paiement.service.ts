import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {AllPaiementResponse} from "../model/responses/AllPaiementResponse";
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {Paiement} from "../model/paiement";

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  apiUrl = environment.api_url + 'api/paiement';


  constructor(private http: HttpClient) {
  }

  getAllPaiement(offset = 0): Observable<AllPaiementResponse> {
    return this.http.get<AllPaiementResponse>(`${this.apiUrl}/all?offset=${offset}`);
  }

  getPaimentById(id: number) {
    return this.http.get<Paiement>(`${this.apiUrl}/chantier/${id}`);
  }

  getPaimentFacture(idFacture: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idFacture}/facture`, {responseType: "arraybuffer"});
  }

  addPaiement(idChantier: number, paiement: Paiement): Observable<Paiement> {
    return this.http.post<Paiement>(`${this.apiUrl}/chantier/${idChantier}`, paiement);
  }

}
