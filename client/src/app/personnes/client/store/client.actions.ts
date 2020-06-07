import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {ClientModel} from "../../../model/clientModel";
import {AllClientsResponse} from "../../../model/responses/AllClientsResponse";


export const loadClient = createAction(
  '[Clients List] Load clients via Service',
);

export const clientsLoaded = createAction(
  '[Clients Effect] Clients Loaded Successfully',
  props<{ clients: AllClientsResponse }>()
);

export const createClient = createAction(
  '[Create Client Component] Create Client',
  props<{ client: ClientModel }>()
);

export const deleteClient = createAction(
  '[Clients List Operations] Delete Client',
  props<{ clientId: number }>()
);

export const updateClient = createAction(
  '[CLients List Operations] Update Client',
  props<{ update: Update<ClientModel> }>()
);

export const clientActionTypes = {
  loadClient,
  clientsLoaded,
  createClient,
  deleteClient,
  updateClient
};
