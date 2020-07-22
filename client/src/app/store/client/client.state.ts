import {ClientModel} from "../../model/clientModel";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {ClientService} from "../../services/client.service";
import {AddClient, DeleteClient, GetClients, UpdateClient} from "./client.actions";
import {tap} from "rxjs/operators";

// Ngxs official site https://www.ngxs.io
// inspired from https://medium.com/better-programming/angular-state-management-with-ngxs-8b17719def29

export class ClientStateModel {
  clients: ClientModel[];
  areClientsLoaded: boolean;
}

@State<ClientStateModel>({
  name: 'clients',
  defaults: {
    clients: [],
    areClientsLoaded: false
  }
})
export class ClientState {

  constructor(private clientService: ClientService) {
  }

  @Selector()
  static getClients(state: ClientStateModel) {
    return state.clients;
  }

  // https://stackoverflow.com/a/51606330
  @Selector()
  static getClientById(state: ClientStateModel) {
    return (id: number) => {
      return state.clients.find((cl) => {
        return cl.id == id;
      });
    };
  }

  @Selector()
  static areClientsLoaded(state: ClientStateModel) {
    return state.areClientsLoaded;
  }

  @Action(GetClients)
  getClients({getState, setState}: StateContext<ClientStateModel>) {
    return this.clientService.getAllClient().pipe(
      tap(result => {
        const state = getState();
        setState({
          ...state,
          clients: result.rows,
          areClientsLoaded: true
        });
      })
    );
  }

  @Action(DeleteClient)
  deleteClent({getState, setState}: StateContext<ClientStateModel>, {id}: DeleteClient) {
    return this.clientService.deleteClientById(id).pipe(
      tap(result => {
        const state = getState();
        const filteredArray = state.clients.filter(item => item.id !== id);
        setState({
          ...state,
          clients: filteredArray,
        });
      })
    );
  }

  @Action(UpdateClient)
  updateClient({getState, setState}: StateContext<ClientStateModel>, {id, payload}: UpdateClient) {
    return this.clientService.updateClient(payload).pipe(
      tap(result => {
        const state = getState();
        const clientsList = [...state.clients];
        const courseIndex = clientsList.findIndex(item => item.id === id);
        clientsList[courseIndex] = result;

        setState({
          ...state,
          clients: clientsList,
        });
      })
    );
  }

  @Action(AddClient)
  addClient({getState, patchState}: StateContext<ClientStateModel>, {payload}: AddClient) {
    return this.clientService.addClient(payload).pipe(tap((result) => {
      const state = getState();
      patchState({
        clients: [...state.clients, result]
      });
    }));
  }
}
