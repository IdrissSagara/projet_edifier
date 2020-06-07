import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AppState} from "../../store/reducers";
import {select, Store} from "@ngrx/store";
import {filter, first, tap} from "rxjs/operators";
import {areClientsLoaded} from "./store/client.selectors";
import {loadClient} from "./store/client.actions";

@Injectable()
export class ClientResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(areClientsLoaded),
        tap((clientsLoaded) => {
          console.log('111', clientsLoaded);
          if (!clientsLoaded) {
            this.store.dispatch(loadClient());
          }
        }),
        filter(coursesLoaded => coursesLoaded),
        first()
      );
  }
}
