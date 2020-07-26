import {Chantier} from "../../model/chantier";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {ChantierService} from "../../services/chantier.service";
import {tap} from "rxjs/operators";
import {AddChantier, DeleteChantier, GetChantiers, UpdateChantier} from "./chantier.actions";

export class ChantierStateModel {
  chantiers: Chantier[];
  count: number;
  areChantiersLoaded: boolean;
}

@State<ChantierStateModel>({
  name: 'chantiers',
  defaults: {
    chantiers: [],
    count: 0,
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

  @Selector()
  static getCount(state: ChantierStateModel) {
    return state.count;
  }

  @Action(GetChantiers)
  getChantiers({getState, setState}: StateContext<ChantierStateModel>, {offset}: GetChantiers) {
    return this.chantierService.getAllChantier(offset).pipe(
      tap(result => {
        const state = getState();
        setState({
          ...state,
          chantiers: result.rows,
          count: result.count,
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

  @Action(UpdateChantier)
  updateChantier({getState, setState}: StateContext<ChantierStateModel>, {id, payload, client}: UpdateChantier) {
    return this.chantierService.updateChantier(payload).pipe(
      tap(result => {
        const state = getState();
        const chantiersList = [...state.chantiers];
        const courseIndex = chantiersList.findIndex(item => item.id === id);
        result.Client = client;
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
