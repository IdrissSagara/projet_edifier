import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ChantierService} from "../services/chantier.service";
import {Chantier} from "../model/chantier";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ChantierModalComponent} from "./chantier-modal/chantier-modal.component";
import {combineLatest, Subscription} from "rxjs";
import {ModalDirective} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-chantier',
  templateUrl: './chantier.component.html',
  styleUrls: ['./chantier.component.css']
})
export class ChantierComponent implements OnInit {
  chantiers;
  chantier: Chantier;
  chantierModalRef: BsModalRef;
  isLoading: Boolean;
  errorMessage: String;
  totalPages: number;
  subscriptions: Subscription[] = [];
  delId: number;
  delName: string;

  @ViewChild('dangerModal') public dangerModal: ModalDirective;

  constructor(private chantierService: ChantierService,
              private modalService: BsModalService,
              private changeDetection: ChangeDetectorRef) {
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
      chantier: this.chantier = new Chantier(),
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

  showUpdateChantierDialog(chantier: Chantier) {
    const initialState = {
      chantier: this.chantier = chantier,
      title: `Modifier le chantier du client : ${this.chantier.Client.nom + ' ' + this.chantier.Client.prenom} `
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

  confirmationSuppressionDialog(chantier: Chantier): void {
    this.delId = chantier.id;
    this.delName = chantier.Client.nom + " " + chantier.Client.prenom;
    this.dangerModal.show();
  }

  declineSupprimeChantier() {
    this.dangerModal.hide();
  }

  confirmSupprimerChantier(): void {
    console.log("chantier id :" + this.delId);

    this.chantierService.deleteChantierById(this.delId).then(res => {
      console.log("suppression du chantier ok");
      this.getAllChantiers();
      this.dangerModal.hide();
    }).catch(err => {
      console.error("une erreur est survenu" + err);
    }).finally(() => {
      this.delId = undefined;
    });

  }


}
