import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PaiementService} from "../../../../services/paiement.service";
import {Paiement} from "../../../../model/paiement";
import {SpinnerService} from "../../../../services/spinner.service";
import {ToastrService} from "ngx-toastr";
import {catchError, first, tap} from "rxjs/operators";
import {UtilisateurService} from "../../../../services/utilisateur.service";
import {Utilisateur} from "../../../../model/utilisateur";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-detail-paiement',
  templateUrl: './detail-paiement.component.html',
  styleUrls: ['./detail-paiement.component.css']
})
export class DetailPaiementComponent implements OnInit {

  paiement: Paiement;
  showError: boolean = false;
  utilisateur$: Observable<Utilisateur>;

  constructor(private route: ActivatedRoute, private paiementService: PaiementService,
              private spinner: SpinnerService, private toastService: ToastrService,
              private utilisateurService: UtilisateurService) {
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.route.params.subscribe(params => {
      this.getPaiementById(params['id'], params['idChantier']);
    });
  }

  getPaiementById(id: number, idChantier: number) {
    this.spinner.show();
    this.paiementService.getPaimentById(id, idChantier).pipe(first()).subscribe((response) => {
      this.paiement = response;
      this.getUser(response.createdBy);
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      this.toastService.error(`Une erreur est survenue lors de la récupération du paiement`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

  getUser(userId: number) {
    this.spinner.show();
    this.utilisateur$ = this.utilisateurService.getUserById(userId).pipe(
      first(),
      tap(() => this.spinner.hide()),
      catchError((err) => {
        this.spinner.hide();
        this.toastService.warning(`Une erreur est survenue lors de la récupération de l'utilisateur`, '', {
          progressBar: true,
          closeButton: true,
          tapToDismiss: false
        });
        return of(err);
      }));
  }


  refresh() {
    this.init();
  }
}
