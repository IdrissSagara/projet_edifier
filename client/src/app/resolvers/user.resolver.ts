import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Observable, of} from "rxjs";
import {Utilisateur} from "../model/utilisateur";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<Utilisateur> {
  constructor(private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Utilisateur> | Promise<Utilisateur> | Utilisateur {
    return this.authService.getMe().pipe(map(user => user),
      catchError(() => {
        return of(undefined);
      }));
  }
}
