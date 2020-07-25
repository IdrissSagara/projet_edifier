import {Component, OnInit} from '@angular/core';
import {Paiement, TYPES_PAIEMENTS} from "../../../../model/paiement";
import {BsModalRef} from "ngx-bootstrap/modal";
import {PaiementService} from "../../../../services/paiement.service";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../../../services/spinner.service";
import {NgModel} from "@angular/forms";
import {first} from "rxjs/operators";

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

  constructor(public paiementModalRel: BsModalRef, private paiementService: PaiementService,
              private toastService: ToastrService, private spinner: SpinnerService) {
  }

  ngOnInit(): void {
  }

  modeModification(): boolean {
    return this.paiement.id !== undefined;
  }

  addPaiement() {
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
