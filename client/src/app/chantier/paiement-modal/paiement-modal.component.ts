import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {PaiementService} from "../../services/paiement.service";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../services/spinner.service";
import {Paiement, TYPES_PAIEMENTS} from "../../model/paiement";
import {Chantier} from "../../model/chantier";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-paiement-modal',
  templateUrl: './paiement-modal.component.html',
  styleUrls: ['./paiement-modal.component.css']
})
export class PaiementModalComponent implements OnInit {

  title: string;
  paiement: Paiement;
  chantier: Chantier;
  erreursServeurs: any = {};

  types_paiements = TYPES_PAIEMENTS

  constructor(public paiementModalRel: BsModalRef, private paiementService: PaiementService,
              private toastService: ToastrService, private spinner: SpinnerService) {
  }

  ngOnInit(): void {
  }

  addPaiement() {
    this.spinner.show();
    this.paiementService.addPaiement(this.chantier.id, this.paiement).subscribe((res) => {
      // this.paiement = res;
      console.log("ok bon----->")
      const message = `Paiement de ${this.paiement.montant} effectuer avec succes`;
      this.paiementModalRel.hide();
      this.toastService.success(message, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.toastService.error(`Une erreur est survenue lors du paiement`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }


  /**
   * Renvoie true si le input est en erreur
   * @param input
   * @returns {boolean}
   */
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
