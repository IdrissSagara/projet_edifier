import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  /**
   * Extrait les données de la requête sous forme Json
   * @param res
   * @returns {any|{}}
   */
  public static extractData(res: HttpResponse<object>) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Mauvais statut de réponse renvoyé par le serveur: ' + res.status);
    }
    let resString = JSON.stringify(res);
    let body = JSON.parse(resString).body;

    return body || {};
  }

  /**
   * Methode gérant les erreurs lors des requêtes HTTPs
   * @param error
   * @returns {ErrorObservable}
   */
  public static handleError(error: any) {
    if (error.status === 403) {
      error.message = error.json().detail;
      error.messageTitle = 'Accès refusé.'
    }
    return Observable.throw(error);
  }

  /**
   * Renvoie les headers à envoyer pour que le serveur sache que l'on traite du JSON
   * @returns {Headers}
   */
  public static getDefaultHeaders(): Headers {
    return new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
  }

  public static flattenObject(object: any): any {
    const toReturn: any = {};

    for (const i in object) {
      if (!object.hasOwnProperty(i)) {
        continue;
      }

      if ((typeof object[i]) === 'object' && !(object[i] instanceof Array)) {
        const flatObject = UtilService.flattenObject(object[i]);
        for (const x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) {
            continue;
          }

          toReturn[i + '_' + x] = flatObject[x];
        }
      } else {
        toReturn[i] = object[i];
      }
    }
    return toReturn;
  }
}
