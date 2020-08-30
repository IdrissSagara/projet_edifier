import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OuvrierService} from "../../../services/ouvrier.service";
import {SpinnerService} from "../../../services/spinner.service";
import {Ouvrier} from "../../../model/ouvrier";
import {ToastrService} from "ngx-toastr";
import {UtilisateurService} from "../../../services/utilisateur.service";
import {Utilisateur} from "../../../model/utilisateur";
import {catchError, first, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Chantier} from "../../../model/chantier";

@Component({
  selector: 'app-ouvrier-details',
  templateUrl: './ouvrier-details.component.html',
  styleUrls: ['./ouvrier-details.component.css']
})
export class OuvrierDetailsComponent implements OnInit {

  ouvrier: Ouvrier;
  chantiers: Chantier[];
  showError: boolean = false;
  user$: Observable<Utilisateur>;

  constructor(private route: ActivatedRoute, private ouvrierService: OuvrierService,
              private spinner: SpinnerService, private toastService: ToastrService,
              private utilisateurService: UtilisateurService) {
  }

  ngOnInit(): void {
    this.init();
  }

  getOuvrierByChantier(id: number) {
    this.spinner.show();
    this.ouvrierService.getChantierByOuvrier(id).pipe(first()).subscribe((response) => {
      this.spinner.hide();
      this.chantiers = response;
      this.chantiers.map(chantier => {
        // TODO: Return client info from backend
        chantier.Client = undefined;
      });
    }, error => {
      this.spinner.hide();
      this.toastService.error(`Une erreur est survenue lors de la récupération des chantiers de l'ouvrier`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

  getOuvrierById(id: number) {
    this.spinner.show();
    this.ouvrierService.getOuvrierById(id).pipe(first()).subscribe((response) => {
      this.ouvrier = response;
      this.getUtilisateur(response.updatedBy);
      this.getUtilisateur(response.createdBy);
    }, error => {
      this.spinner.hide();
      this.toastService.error(`Une erreur est survenue lors de la récupération du chantier`, '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
    });
  }

  getUtilisateur(id: number) {
    this.user$ = this.utilisateurService.getUserById(id).pipe(
      first(),
      tap(() => {
        this.spinner.hide();
      }),
      catchError((err) => {
        this.spinner.hide();
        return of(err);
      })
    );
  }

  refresh() {
    this.init();
  }

  private init(): void {
    this.route.params.subscribe(params => {
      this.getOuvrierById(params['id']);
      this.getOuvrierByChantier(params['id']);
    });
  }
}
