import {Reporting} from "../../model/reporting";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {tap} from "rxjs/operators";
import {GetReporting} from "./reporting.action";
import {ReportingService} from "../../services/dashboard/reporting.service";

export class ReportingStateModel {
  reporting: Reporting;
  isReportingLoaded: boolean;
}


@State<ReportingStateModel>({
  name: 'reporting',
  defaults: {
    reporting: null,
    isReportingLoaded: false
  }
})
export class ReportingState {

  constructor(private readonly reportingService: ReportingService) {
  }

  @Selector()
  static getReporting(state: ReportingStateModel) {
    return state.reporting;
  }

  @Selector()
  static isReportingLoaded(state: ReportingStateModel) {
    return state.isReportingLoaded;
  }

  @Action(GetReporting)
  getClients({getState, setState}: StateContext<ReportingStateModel>) {
    return this.reportingService.getReporting().pipe(
      tap(result => {
        const state = getState();
        setState({
          ...state,
          reporting: result,
          isReportingLoaded: true
        });
      })
    );
  }
}
