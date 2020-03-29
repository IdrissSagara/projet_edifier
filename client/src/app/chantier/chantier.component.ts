import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ChantierService} from "../services/chantier.service";
import {Chantier} from "../model/chantier";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ChantierModalComponent} from "./chantier-modal/chantier-modal.component";
import {combineLatest, Subscription} from "rxjs";

@Component({
  selector: 'app-chantier',
  templateUrl: './chantier.component.html',
  styleUrls: ['./chantier.component.css']
})
export class ChantierComponent implements OnInit {
  chantiers;
  newChantier: Chantier;
  chantierModalRef: BsModalRef;
  isLoading: Boolean;
  errorMessage: String;
  totalPages: number;
  subscriptions: Subscription[] = [];

  constructor(private chantierService: ChantierService, private modalService: BsModalService, private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getAllChantiers();
  }

  getAllChantiers() {
    this.isLoading = true;
    this.chantiers = [];
    this.chantierService.getAllChantier().then(res => {
      this.errorMessage = undefined;
      this.chantiers = res.rows;
      this.totalPages = res.count;
    }).catch(err => {
      this.errorMessage = "data loading error";
      console.log("error during getting all the chantiers");
      console.log(err);
    }).finally(() => {
      this.isLoading = false;
    });
  }

  showAddChantierDialog() {
    const initialState = {
      chantier: this.newChantier,
      title: 'Ajouter un nouveau chantier'
    };

    const _combine = combineLatest(
      this.modalService.onShown,
      this.modalService.onHidden
    ).subscribe(() => this.changeDetection.markForCheck());

    this.subscriptions.push(
      this.modalService.onShown.subscribe((reason: string) => {
        // initialisa
      })
    );
    this.subscriptions.push(
      this.modalService.onHidden.subscribe((reason: string) => {
        if (reason === null) {
          this.getAllChantiers();
        }

        this.unsubscribe();
      })
    );

    this.subscriptions.push(_combine);

    this.chantierModalRef = this.modalService.show(ChantierModalComponent, {initialState});
    this.chantierModalRef.content.closeBtnName = 'Close';
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}
