import {Component, OnInit} from '@angular/core';
import {Paiement, TYPES_PAIEMENTS} from "../../../../model/paiement";
import {BsModalRef} from "ngx-bootstrap/modal";
import {PaiementService} from "../../../../services/paiement.service";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../../../services/spinner.service";
import {NgModel} from "@angular/forms";
import {finalize, first} from "rxjs/operators";
import {Chantier} from "../../../../model/chantier";

@Component({
  selector: 'app-paiement-modal',
  templateUrl: './paiement-modal.component.html',
  styleUrls: ['./paiement-modal.component.css']
})
export class PaiementModalComponent implements OnInit {

  title: String;
  paiement: Paiement;
  erreursServeurs: any = {};
  types_paiements = TYPES_PAIEMENTS;
  chantier: Chantier;

  constructor(public paiementModalRel: BsModalRef, private paiementService: PaiementService,
              private toastService: ToastrService, private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    if (this.modeModification()) {
      this.paiement.date_paiement = new Date(this.paiement.date_paiement).toISOString().split('T')[0];
    }
  }

  modeModification(): boolean {
    return this.paiement.id !== undefined;
  }

  validerPaiement() {
    if (this.modeModification()) {
      this.spinner.show();
      this.paiementService.updatePaiement(this.paiement).pipe(first()).subscribe(paiement => {
        const message = `Modification de l'paiement ${this.paiement.id} du chantier ${this.paiement.ChantierId}`;
        this.paiementModalRel.hide();
        this.spinner.hide();
        this.toastService.success(message, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });

      }, error => {
        this.spinner.hide();
        this.toastService.error(`Erreur lors de la modification du paiement`, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      });
    } else {
      this.spinner.show();
      this.paiementService.addPaiement(this.chantier.id, this.paiement).pipe(
        first(), finalize(() => this.spinner.hide())).subscribe((res) => {
        const message = `Paiement de ${this.paiement.montant} effectuer avec succes`;
        this.paiementModalRel.hide();
        this.toastService.success(message, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      }, error => {
        this.toastService.error(`Une erreur est survenue lors du paiement`, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
      });
    }

  }

  inputEnErreur(input: NgModel): boolean {
    // validation côté client (validation html)
    if (input.invalid && input.touched) {
      return true;
    }

    if (input.untouched && input.errors && !input.errors.required) {
      return true;
    }
    return this.erreursServeurs.hasOwnProperty(input.name);
  }
}
