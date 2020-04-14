import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ChantierService} from "../services/chantier.service";
import {Chantier} from "../model/chantier";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ChantierModalComponent} from "./chantier-modal/chantier-modal.component";
import {combineLatest, Subscription} from "rxjs";
import {ModalDirective} from "ngx-bootstrap/modal";
import {ToastrService} from "ngx-toastr";

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
  subscriptions: Subscription[] = [];
  delId: number;
  delName: string;

  totalItems: number;
  currentPage: number;

  @ViewChild('dangerModal') public dangerModal: ModalDirective;

  constructor(private chantierService: ChantierService,
              private modalService: BsModalService,
              private changeDetection: ChangeDetectorRef,
              private toastService: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllChantiers();
  }

  getAllChantiers(offset = 0) {
    this.isLoading = true;
    this.chantiers = [];
    this.chantierService.getAllChantier(offset).then(res => {
      this.errorMessage = undefined;
      this.chantiers = res.rows;
      this.totalItems = res.count;
    }).catch(err => {
      this.errorMessage = "data loading error";
      this.toastService.error('Une erreur est survenu lors de la récuperation des chantiers', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
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
    this.chantierService.deleteChantierById(this.delId).then(res => {
      this.getAllChantiers();
      this.dangerModal.hide();
      this.toastService.success('Chantier suppimer avec succes ', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    }).catch(err => {
      const e = JSON.parse(err.error);
      let message = 'Une erreur est survenu lors de la suppression du chantier';
      if (e.code === 'ER_ROW_IS_REFERENCED_2') {
        message = 'Cet chantier contient des mouvements vous ne pouvez pas le supprimer';
      }
      this.dangerModal.hide();
      this.toastService.error(message, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    }).finally(() => {
      this.delId = undefined;
    });
  }

  pageChanged(event: any): void {
    const offset = (event.page - 1) * 10;
    this.getAllChantiers(offset);
  }
}
