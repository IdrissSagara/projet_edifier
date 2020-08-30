import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {OuvrierService} from "../../services/ouvrier.service";
import {Ouvrier} from "../../model/ouvrier";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../services/spinner.service";
import {combineLatest, Subscription} from "rxjs";
import {OuvrierModalComponent} from "./ouvrier-modal/ouvrier-modal.component";
import {BsModalRef, BsModalService, ModalDirective} from "ngx-bootstrap/modal";
import {AddOuvrierToChantierModalComponent} from "./add-ouvrier-to-chantier-modal/add-ouvrier-to-chantier-modal.component";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-ouvriers',
  templateUrl: './ouvriers.component.html',
  styleUrls: ['./ouvriers.component.css']
})
export class OuvriersComponent implements OnInit {
  ouvrier: Ouvrier[];
  ouvriers: Ouvrier;
  totalItems: number;
  errorMessage: String;
  subscriptions: Subscription[] = [];
  ouvrierModalRef: BsModalRef;
  deletedId: number;
  deltedName: string;

  @ViewChild('dangerModal') public dangerModal: ModalDirective;

  constructor(private ouvrierService: OuvrierService, private toastService: ToastrService,
              private spinner: SpinnerService,
              private modalService: BsModalService,
              private changeDetection: ChangeDetectorRef) {
  }

  get isLoading() {
    return this.spinner.iterationOfShow > 0;
  }

  ngOnInit(): void {
    this.getAllOuvrier();
  }

  getAllOuvrier() {
    this.spinner.show();
    this.ouvrierService.getAllOuvrier().pipe(first()).subscribe((response) => {
      this.ouvrier = response.rows;
      this.totalItems = response.count;
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.toastService.error('Une erreur est survenu lors de la recupération des ouvriers', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

  showAddOuvrierDialog() {
    const initialState = {
      ouvrier: this.ouvriers = new Ouvrier(),
      title: 'Ajouter un ouvrier'
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
          this.getAllOuvrier();
        }

        this.unsubscribe();
      })
    );

    this.subscriptions.push(_combine);

    this.ouvrierModalRef = this.modalService.show(OuvrierModalComponent, {initialState});
    this.ouvrierModalRef.content.closeBtnName = 'Close';
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  confirmationSuppressionDialog(ouvrier: Ouvrier) {
    this.deletedId = ouvrier.id;
    this.deltedName = ouvrier.nom + " " + ouvrier.prenom;
    this.dangerModal.show();
  }

  declineSupprimeOuvrier() {
    this.dangerModal.hide();
  }

  confirmSupprimerOuvrier() {
    this.spinner.show();
    this.ouvrierService.deleteOuvrierById(this.deletedId).pipe(first()).subscribe(res => {
      this.getAllOuvrier();
      this.toastService.success('Ouvrier suppimer avec succes', '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.deletedId = undefined;
      this.dangerModal.hide();
    }, (err) => {
      this.spinner.hide();
      this.dangerModal.hide();
      const message = 'Une erreur est survenu lors de la suppression de l\'ouvrier';
      this.toastService.error(message, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.deletedId = undefined;
    });
  }

  ajouterOuvrierAuChantier(id: number) {
    const initialState = {
      ouvrierId: id,
      title: `Ajouter un ouvrier au chantier `
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
          this.getAllOuvrier();
        }

        this.unsubscribe();
      })
    );

    this.subscriptions.push(_combine);

    this.ouvrierModalRef = this.modalService.show(AddOuvrierToChantierModalComponent, {initialState});
    this.ouvrierModalRef.content.closeBtnName = 'Close';
  }

  showUpdateOuvrierDialog(ouvrier: Ouvrier) {
    const initialState = {
      ouvrier: this.ouvriers = ouvrier,
      title: `Modifier l'ouvrier : ${this.ouvriers.nom + ' ' + this.ouvriers.prenom}`
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
          this.getAllOuvrier();
        }

        this.unsubscribe();
      })
    );

    this.subscriptions.push(_combine);

    this.ouvrierModalRef = this.modalService.show(OuvrierModalComponent, {initialState});
    this.ouvrierModalRef.content.closeBtnName = 'Close';
  }

  trackById(_, ouvrier: Ouvrier): number {
    return ouvrier.id;
  }
}
