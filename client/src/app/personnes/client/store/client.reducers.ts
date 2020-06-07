import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {clientActionTypes} from './client.actions';
import {ClientModel} from "../../../model/clientModel";

export interface ClientState extends EntityState<ClientModel> {
  clientsLoaded: boolean;
}

export const adapter: EntityAdapter<ClientModel> = createEntityAdapter<ClientModel>();

export const initialState = adapter.getInitialState({
  clientsLoaded: false
});

export const clientReducer = createReducer(
  initialState,

  on(clientActionTypes.clientsLoaded, (state, action) => {
    return adapter.addAll(
      action.clients.rows,
      {...state, clientsLoaded: true}
    );
  }),

  on(clientActionTypes.createClient, (state, action) => {
    return adapter.addOne(action.client, state);
  }),

  on(clientActionTypes.deleteClient, (state, action) => {
    return adapter.removeOne(action.clientId, state);
  }),

  on(clientActionTypes.updateClient, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

export const {selectAll, selectIds} = adapter.getSelectors();
