import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PaiementService} from "../../../../services/paiement.service";
import {Paiement} from "../../../../model/paiement";
import {SpinnerService} from "../../../../services/spinner.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-detail-paiement',
  templateUrl: './detail-paiement.component.html',
  styleUrls: ['./detail-paiement.component.css']
})
export class DetailPaiementComponent implements OnInit {

  paiement: Paiement;

  constructor(private route: ActivatedRoute, private paiementService: PaiementService,
              private spinner: SpinnerService, private toastService: ToastrService) {
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.route.params.subscribe(params => {
      this.getPaiementById(params['id']);
    });
  }

  getPaiementById(id: number) {
    this.paiementService.getPaimentById(id).subscribe((response) => {
      this.paiement = response;
    }, (error) => {
      this.toastService.error(`Une erreur est survenue lors de la récupération du paiement`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }


}
