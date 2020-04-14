import {Component, OnInit} from '@angular/core';
import {PaiementService} from "../../../services/paiement.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-paiements',
  templateUrl: './paiements.component.html',
  styleUrls: ['./paiements.component.css']
})
export class PaiementsComponent implements OnInit {
  paiements;
  errorMessage: String;
  isLoading: Boolean;
  totalPages: number;
  currentPage: number;

  constructor(private paiementService: PaiementService, private toastService: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllPaiement();
  }

  getAllPaiement() {
    this.isLoading = true;
    this.paiements = [];
    this.paiementService.getAllPaiement().then(res => {
      this.errorMessage = undefined;
      this.paiements = res.rows;
      this.totalPages = res.count;
    }).catch(err => {
      const message = "erreur de chargement des données";
      this.toastService.error(message, '', {
        progressBar: true,
      });
    }).finally(() => {
      this.isLoading = false;
    });
  }

  UpdatePaiementDialog() {

  }

  confirmationSuppressionDialog() {

  }
}
