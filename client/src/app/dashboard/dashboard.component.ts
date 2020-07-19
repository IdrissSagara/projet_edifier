import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Reporting} from "../model/reporting";
import {tap} from "rxjs/operators";
import {Select, Store} from "@ngxs/store";
import {ReportingState} from "../store/reporting/reporting.state";
import {GetReporting} from "../store/reporting/reporting.action";

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  @Select(ReportingState.getReporting) reporting$: Observable<Reporting>;
  @Select(ReportingState.isReportingLoaded) isReportingLoaded$;
  isReportingLoadedSub: Subscription;

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.isReportingLoadedSub = this.isReportingLoaded$.pipe(
      tap((isReportingLoaded) => {
        if (!isReportingLoaded) {
          this.store.dispatch(new GetReporting());
        }
      })
    ).subscribe(value => {
    });
  }

  ngOnDestroy() {
    this.isReportingLoadedSub.unsubscribe();
  }
}
