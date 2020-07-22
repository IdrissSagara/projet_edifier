import {Chantier} from "../../model/chantier";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {ChantierService} from "../../services/chantier.service";
import {UpdateClient} from "../client/client.actions";
import {tap} from "rxjs/operators";
import {AddChantier, DeleteChantier, GetChantiers, UpdateChantier} from "./chantier.actions";

export class ChantierStateModel {
  chantiers: Chantier[];
  areChantiersLoaded: boolean;
}

@State<ChantierStateModel>({
  name: 'chantiers',
  defaults: {
    chantiers: [],
    areChantiersLoaded: false
  }
})
export class ChantierState {

  constructor(private chantierService: ChantierService) {
  }

  @Selector()
  static getChantiers(state: ChantierStateModel) {
    return state.chantiers;
  }

  @Selector()
  static getChantierById(state: ChantierStateModel) {
    return (id: number) => {
      return state.chantiers.find((ch) => {
        return ch.id == id;
      });
    };
  }

  @Selector()
  static areChantiersLoaded(state: ChantierStateModel) {
    return state.areChantiersLoaded;
  }

  @Action(GetChantiers)
  getChantiers({getState, setState}: StateContext<ChantierStateModel>) {
    return this.chantierService.getAllChantier().pipe(
      tap(result => {
        const state = getState();
        setState({
          ...state,
          chantiers: result.rows,
          areChantiersLoaded: true
        });
      })
    );
  }

  @Action(DeleteChantier)
  deleteChantier({getState, setState}: StateContext<ChantierStateModel>, {id}: DeleteChantier) {
    return this.chantierService.deleteChantierById(id).pipe(
      tap(result => {
        const state = getState();
        const filteredArray = state.chantiers.filter(item => item.id !== id);
        setState({
          ...state,
          chantiers: filteredArray,
        });
      })
    );
  }

  @Action(UpdateClient)
  updateChantier({getState, setState}: StateContext<ChantierStateModel>, {id, payload}: UpdateChantier) {
    return this.chantierService.updateChantier(payload).pipe(
      tap(result => {
        const state = getState();
        const chantiersList = [...state.chantiers];
        const courseIndex = chantiersList.findIndex(item => item.id === id);
        chantiersList[courseIndex] = result;

        setState({
          ...state,
          chantiers: chantiersList,
        });
      })
    );
  }

  @Action(AddChantier)
  addChantier({getState, patchState}: StateContext<ChantierStateModel>, {payload}: AddChantier) {
    return this.chantierService.addChantier(payload).pipe(tap((result) => {
      const state = getState();
      patchState({
        chantiers: [...state.chantiers, result]
      });
    }));
  }
}
