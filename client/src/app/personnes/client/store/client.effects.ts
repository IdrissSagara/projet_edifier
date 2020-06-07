import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap, map, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {clientActionTypes} from "./client.actions";
import {ClientService} from "../../../services/client.service";

@Injectable()
export class ClientEffects {

  loadClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActionTypes.loadClient),
      concatMap(() => this.clientService.getAllClient()),
      map(clients => clientActionTypes.clientsLoaded({clients}))
    )
  );

  createClient$ = createEffect(() =>
      this.actions$.pipe(
        ofType(clientActionTypes.createClient),
        concatMap((action) => this.clientService.addClient(action.client)),
        tap(() => this.router.navigateByUrl('/personnes/clients'))
      ),
    {dispatch: false}
  );

  deleteClient$ = createEffect(() =>
      this.actions$.pipe(
        ofType(clientActionTypes.deleteClient),
        concatMap((action) => this.clientService.deleteClientById(action.clientId))
      ),
    {dispatch: false}
  );

  updateClient$ = createEffect(() =>
      this.actions$.pipe(
        ofType(clientActionTypes.updateClient),
        concatMap((action) => this.clientService.updateClient(action.update.id))
      ),
    {dispatch: false}
  );

  constructor(private clientService: ClientService, private actions$: Actions, private router: Router) {
  }
}
