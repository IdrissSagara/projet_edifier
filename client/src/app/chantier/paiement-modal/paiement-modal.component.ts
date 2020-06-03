import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {PaiementService} from "../../services/paiement.service";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../services/spinner.service";
import {Paiement, TYPES_PAIEMENTS} from "../../model/paiement";
import {Chantier} from "../../model/chantier";

@Component({
  selector: 'app-paiement-modal',
  templateUrl: './paiement-modal.component.html',
  styleUrls: ['./paiement-modal.component.css']
})
export class PaiementModalComponent implements OnInit {

  title: string;
  paiemnt: Paiement;
  chantier: Chantier;

  types_paiements = TYPES_PAIEMENTS

  constructor(public paiementModalRel: BsModalRef, private paiementService: PaiementService,
              private toastService: ToastrService, private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    this.paiemnt = this.paiemnt;
  }

  addPaiement() {

  }
}
